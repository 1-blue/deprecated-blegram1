import bcrypt from "bcrypt";

// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type {
  ApiUpdatePasswordRequest,
  ApiUpdatePasswordResponse,
} from "@src/types/api";
import { hashing } from "@src/lib/auth";

/** 2023/03/31 - 로그인한 유저 비밀번호 수정 엔드포인트 - by 1-blue */
const handler: NextApiHandler<ApiUpdatePasswordResponse> = async (req, res) => {
  // 타입문제 때문에 작성 ( 이론상 여기에 걸리는 경우는 없음 )
  if (!req.user) return res.status(302).redirect(req.url || "/");

  try {
    // 로그인한 유저 정보 비밀번호 수정
    if (req.method === "PATCH") {
      const { currentPassword, password } =
        req.body as ApiUpdatePasswordRequest;

      // 로그인한 유저의 비밀번호 찾기
      const exUser = await prisma.user.findUnique({
        where: { idx: req.user.idx },
      });

      // 유저가 존재하지 않는다면 ( 미들웨어로 검사하기 때문에 이론상 여기에 걸릴 수 없음... 타입 문제 때문에 작성 )
      if (!exUser)
        return res
          .status(403)
          .json({ message: "비밀번호를 수정할 권한이 없습니다." });

      // 비밀번호 일치 여부 확인
      const isValidated = await bcrypt.compare(
        currentPassword,
        exUser.password
      );

      // 비밀번호 불일치
      if (!isValidated) {
        return res
          .status(403)
          .json({ message: "비밀번호가 일치하지 않습니다." });
      }

      // 비밀번호 해싱
      const hashedPassword = await hashing(password);

      // 비밀번호 변경
      await prisma.user.update({
        where: { idx: exUser.idx },
        data: { password: hashedPassword },
      });

      // 로그아웃
      return res.status(302).redirect("/api/logout");
    }
  } catch (error) {
    console.error("/api/me/password error >> ", error);

    return res
      .status(500)
      .json({ message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!" });
  }
};

export default withAuthMiddleware({
  methods: ["PATCH"],
  handler,
  isAuth: true,
});
