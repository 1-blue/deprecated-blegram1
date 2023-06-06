// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";
import { hashing } from "@src/lib/auth";

// type
import type { NextApiHandler } from "next";
import type { ApiSignUpRequest, ApiSignUpResponse } from "@src/types/api";

/** 2023/03/26 - 회원가입 엔드포인트 - by 1-blue */
const handler: NextApiHandler<ApiSignUpResponse> = async (req, res) => {
  // 로그인하고 회원가입 요청을 보낸 경우
  if (req.user) {
    return res.status(403).json({
      message: "로그인을 하지 않은 경우에만 회원가입이 가능합니다.",
    });
  }

  try {
    // 회원가입
    if (req.method === "POST") {
      // 회원가입하는 유저의 데이터
      const { password, ...body } = req.body as ApiSignUpRequest;

      // 아이디, 이름, 이메일, 휴대폰 번호 중복 검사 ( DB )
      const exUserList = await Promise.all([
        prisma.user.findUnique({ where: { id: body.id } }),
        prisma.user.findUnique({ where: { nickname: body.nickname } }),
        prisma.user.findUnique({ where: { email: body.email } }),
        prisma.user.findUnique({ where: { phone: body.phone } }),
      ]);

      // 아이디, 이름, 이메일, 휴대폰 번호 중복 검사 ( 응답 )
      if (exUserList[0])
        return res.status(409).json({ message: "아이디가 이미 존재합니다." });
      if (exUserList[1])
        return res.status(409).json({ message: "별칭이 이미 존재합니다." });
      if (exUserList[2])
        return res.status(409).json({ message: "이메일이 이미 존재합니다." });
      if (exUserList[3])
        return res
          .status(409)
          .json({ message: "휴대폰 번호가 이미 존재합니다." });

      // 비밀번호 암호화
      const hashedPassword = await hashing(password);

      // 유저 생성
      await prisma.user.create({
        data: { ...body, password: hashedPassword, createdAt: new Date() },
      });

      return res.status(201).json({
        message: "회원가입을 성공했습니다.\n로그인 페이지로 이동됩니다.",
      });
    }
  } catch (error) {
    console.error("/api/signup error >> ", error);

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
