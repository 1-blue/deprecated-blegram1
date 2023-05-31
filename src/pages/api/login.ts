import bcrypt from "bcrypt";

// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";
import { generateAccessToken, generateRefreshToken } from "@src/lib/auth";

// util
import { generateCookie } from "@src/utils";

// type
import type { NextApiHandler } from "next";
import type { LogInForm } from "@src/types";
import type { ApiLogInResponse } from "@src/types/api";
interface LogInBody extends LogInForm {}

/** 2023/03/29 - 로그인 엔드포인트 - by 1-blue */
const handler: NextApiHandler<ApiLogInResponse> = async (req, res) => {
  // 로그인하고 로그인 요청을 보낸 경우
  if (req.user) {
    return res
      .status(403)
      .json({ message: "로그인을 하지 않은 경우에만 로그인이 가능합니다." });
  }

  try {
    // 로그인
    if (req.method === "POST") {
      const { id, password } = req.body as LogInBody;

      // 아이디가 일치하는 유저 있는지 검색
      const exUser = await prisma.user.findUnique({
        where: { id },
        select: { idx: true, password: true },
      });

      // 아이디에 해당하는 유저가 존재하지 않음
      if (!exUser)
        return res.status(401).json({ message: "존재하는 유저가 없습니다." });

      // 비밀번호 일치 여부 확인
      const isValidated = await bcrypt.compare(password, exUser.password);
      // 비밀번호 불일치
      if (!isValidated) {
        return res
          .status(401)
          .json({ message: "비밀번호가 일치하지 않습니다." });
      }

      // 인증/리프레쉬 토큰 생성
      const accessToken = generateAccessToken({ idx: exUser.idx });
      const refreshToken = generateRefreshToken({ idx: exUser.idx });

      // 인증/리프래쉬 토큰 쿠키로 등록
      res.setHeader("Set-Cookie", [
        generateCookie("bat", accessToken, 1000 * 60 * 60),
        generateCookie("brt", refreshToken, 1000 * 60 * 60 * 24 * 7),
      ]);

      return res
        .status(200)
        .json({ message: "로그인에 성공했습니다.\n메인 페이지로 이동됩니다." });
    }
  } catch (error) {
    console.error("/api/login error >> ", error);

    return res
      .status(500)
      .json({ message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!" });
  }
};

export default withAuthMiddleware({
  methods: ["POST"],
  handler,
  isAuth: false,
});
