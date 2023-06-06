import { prisma } from "@src/prisma";

// lib
import { generateAccessToken, verifyToken } from "@src/lib/auth";

// util
import { clearCookie, generateCookie } from "@src/utils";

// type
import type { NextApiHandler } from "next";
import type { ApiResponse } from "@src/types/api";

/** 2023/03/26 - HTTP Methods 타입 - by 1-blue */
type Methods = "GET" | "POST" | "DELETE" | "PATCH";

interface AuthMiddlewareConfig {
  methods: Methods[];
  handler: NextApiHandler;
  isAuth?: boolean;
}
interface WithAuthMiddleware {
  (config: AuthMiddlewareConfig): NextApiHandler<ApiResponse>;
}

// 2023/03/26 - method에 따른 라우팅을 쉽게 처리해주는 HOF + 접근 권한 확인 - by 1-blue
const withAuthMiddleware: WithAuthMiddleware =
  ({ methods, handler, isAuth = true }) =>
  async (req, res) => {
    // 정해진 메서드를 사용하지 않았다면
    if (!methods.includes(req.method as Methods)) {
      return res.status(405).json({
        message: "가능한 요청이 아닙니다.\n확인후에 다시 시도해주세요!",
      });
    }

    // 쿠키에서 인증/리프래쉬 토큰 갖고오기
    const { bat, brt } = req.cookies;

    // 로그인이 필요한 접근이라면 ( 토큰 검사 후 "req.user"에 로그인한 유저 데이터 넣어주는 로직 )
    if (isAuth) {
      // 리프레쉬 토큰이 없는 경우
      if (!brt) {
        return res.status(401).json({
          message: "접근할 권한이 없습니다.\n로그인 후에 접근해주세요.",
        });
      }

      // 리프래쉬 토큰 유효성 검사
      const verifyRefreshToken = verifyToken("refresh", brt);

      // 유효하지 않은 토큰
      if (verifyRefreshToken.status === "INVALID") {
        // 유효하지 않은 토큰 지우기
        res.setHeader("Set-Cookie", [
          clearCookie("brt", brt),
          clearCookie("bat", bat),
        ]);

        return res.status(401).json({
          message: "유효하지 않은 토큰입니다.\n다시 로그인해주세요.",
        });
      }
      // 리프래쉬 토큰 유효기간 만료
      if (verifyRefreshToken.status === "EXPIRED") {
        // 만료된 토큰 지우기
        res.setHeader("Set-Cookie", [
          clearCookie("brt", brt),
          clearCookie("bat", bat),
        ]);

        return res.status(401).json({
          message: "만료된 토큰입니다.\n다시 로그인해주세요.",
        });
      }
      // 안전한 타입을 위해 검사
      if (verifyRefreshToken.status !== "SUCCESS") {
        return res.status(500).json({
          message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!",
        });
      }

      // 인증 토큰이 없는 경우
      if (!bat) {
        // 인증 토큰 생성
        const accessToken = generateAccessToken({
          idx: verifyRefreshToken.payload.idx,
        });

        // 인증 토큰 쿠키로 등록
        res.setHeader(
          "Set-Cookie",
          generateCookie("bat", accessToken, 1000 * 60 * 60)
        );

        // 리다이렉트
        return res.status(302).redirect(req.url || "/");
      }

      // 인증 토큰이 있는 경우
      // 인증 토큰 유효성 검사
      const verifyAccessToken = verifyToken("access", bat);

      // 유효하지 않은 인증 토큰
      if (verifyAccessToken.status === "INVALID") {
        // 유효하지 않은 토큰 지우기
        res.setHeader("Set-Cookie", clearCookie("bat", bat));

        return res.status(401).json({
          message: "유효하지 않은 토큰입니다.\n다시 로그인해주세요.",
        });
      }
      // 인증 토큰 유효기간 만료 ( 인증 토큰 재발급 )
      if (verifyAccessToken.status === "EXPIRED") {
        // 인증 토큰 생성
        const accessToken = generateAccessToken({
          idx: verifyRefreshToken.payload.idx,
        });

        // 인증 토큰 쿠키로 등록
        res.setHeader(
          "Set-Cookie",
          generateCookie("bat", accessToken, 1000 * 60 * 60)
        );

        // 리다이렉트
        return res.status(302).redirect(req.url || "/");
      }
      // 안전한 타입을 위해 검사
      if (verifyRefreshToken.status !== "SUCCESS") {
        return res.status(500).json({
          message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!",
        });
      }

      try {
        // 토큰에 일치하는 유저 검색
        const exUser = await prisma.user.findUnique({
          where: { idx: verifyRefreshToken.payload.idx },
        });

        // 존재하지 않는 유저 ( 인증 토큰을 갖고 회원 탈퇴한 경우 )
        if (!exUser)
          return res.status(404).json({
            message: "존재하지 않는 유저입니다.\n다시 로그인해주세요.",
          });

        // 비밀번호 제외하기
        const { password, ...user } = exUser;

        // 응답 객체에 유저 정보 등록
        Object.defineProperty(req, "user", {
          value: user,
          writable: false,
          configurable: false,
        });
      } catch (error) {
        // 알 수 없는 서버측의 에러
        console.error("middleware token error >> ", error);
        return res
          .status(500)
          .json({ message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!" });
      }
    }
    // 로그인하지 않아도 되는 접근이라도 로그인한 유저라면 "req.user"에 로그인한 유저 데이터 넣기
    else {
      // 로그인하지 않아도 되는 요청이지만, 리프레쉬 토큰이 있는 경우
      if (brt) {
        // 리프래쉬 토큰 유효성 검사
        const verifyRefreshToken = verifyToken("refresh", brt);

        // 유효하지 않은 토큰
        if (verifyRefreshToken.status === "INVALID") {
          // 유효하지 않은 토큰 지우기
          res.setHeader("Set-Cookie", [
            clearCookie("brt", brt),
            clearCookie("bat", bat),
          ]);

          return res.status(401).json({
            message: "유효하지 않은 토큰입니다.\n다시 로그인해주세요.",
          });
        }
        // 리프래쉬 토큰 유효기간 만료
        if (verifyRefreshToken.status === "EXPIRED") {
          // 만료된 토큰 지우기
          res.setHeader("Set-Cookie", [
            clearCookie("brt", brt),
            clearCookie("bat", bat),
          ]);

          return res.status(401).json({
            message: "만료된 토큰입니다.\n다시 로그인해주세요.",
          });
        }
        // 안전한 타입을 위해 검사
        if (verifyRefreshToken.status !== "SUCCESS") {
          return res.status(500).json({
            message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!",
          });
        }

        // 인증 토큰이 없는 경우
        if (!bat) {
          // 인증 토큰 생성
          const accessToken = generateAccessToken({
            idx: verifyRefreshToken.payload.idx,
          });

          // 인증 토큰 쿠키로 등록
          res.setHeader(
            "Set-Cookie",
            generateCookie("bat", accessToken, 1000 * 60 * 60)
          );

          // 리다이렉트
          return res.status(302).redirect(req.url || "/");
        }

        // 인증 토큰이 있는 경우
        // 인증 토큰 유효성 검사
        const verifyAccessToken = verifyToken("access", bat);

        // 유효하지 않은 인증 토큰
        if (verifyAccessToken.status === "INVALID") {
          // 유효하지 않은 토큰 지우기
          res.setHeader("Set-Cookie", clearCookie("bat", bat));

          return res.status(401).json({
            message: "유효하지 않은 토큰입니다.\n다시 로그인해주세요.",
          });
        }
        // 인증 토큰 유효기간 만료 ( 인증 토큰 재발급 )
        if (verifyAccessToken.status === "EXPIRED") {
          // 인증 토큰 생성
          const accessToken = generateAccessToken({
            idx: verifyRefreshToken.payload.idx,
          });

          // 인증 토큰 쿠키로 등록
          res.setHeader(
            "Set-Cookie",
            generateCookie("bat", accessToken, 1000 * 60 * 60)
          );

          // 리다이렉트
          return res.status(302).redirect(req.url || "/");
        }
        // 안전한 타입을 위해 검사
        if (verifyRefreshToken.status !== "SUCCESS") {
          return res.status(500).json({
            message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!",
          });
        }

        try {
          // 토큰에 일치하는 유저 검색
          const exUser = await prisma.user.findUnique({
            where: { idx: verifyRefreshToken.payload.idx },
          });

          // 존재하지 않는 유저 ( 인증 토큰을 갖고 회원 탈퇴한 경우 )
          if (!exUser)
            return res.status(404).json({
              message: "존재하지 않는 유저입니다.\n다시 로그인해주세요.",
            });

          // 비밀번호 제외하기
          const { password, ...user } = exUser;

          // 응답 객체에 유저 정보 등록
          Object.defineProperty(req, "user", {
            value: user,
            writable: false,
            configurable: false,
          });
        } catch (error) {
          // 알 수 없는 서버측의 에러
          console.error("middleware token error >> ", error);
          return res.status(500).json({
            message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!",
          });
        }
      }
    }

    try {
      await handler(req, res);
    } catch (error) {
      console.error("middleware server error >> ", error);

      return res
        .status(500)
        .json({ message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!" });
    } finally {
      // // FIXME: 배포전에 제거
      // console.log(req.url, res.statusCode);
    }
  };

export default withAuthMiddleware;
