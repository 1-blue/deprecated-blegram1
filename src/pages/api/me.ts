import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type { ApiFetchMeResponse, ApiUpdateMeResponse } from "@src/types/api";
import type { ProfileUpdateForm } from "@src/types";

const handler: NextApiHandler<
  ApiFetchMeResponse | ApiUpdateMeResponse
> = async (req, res) => {
  // 타입문제 때문에 작성 ( 이론상 여기에 걸리는 경우는 없음 )
  if (!req.user) return res.status(302).redirect(req.url || "/");

  try {
    // 로그인한 유저의 정보 요청
    if (req.method === "GET") {
      return res.status(200).json({
        message: `"${req.user.nickname}"님의 정보를 가져왔습니다.`,
        user: req.user,
      });
    }
    // 로그인한 유저 정보 수정
    if (req.method === "PATCH") {
      const body = req.body.body as ProfileUpdateForm;

      // 이름, 이메일, 휴대폰 번호 중복 검사 ( DB )
      const exUserList = await Promise.all([
        prisma.user.findUnique({
          where: { nickname: body.nickname },
          select: { idx: true },
        }),
        prisma.user.findUnique({
          where: { email: body.email },
          select: { idx: true },
        }),
        prisma.user.findUnique({
          where: { phone: body.phone },
          select: { idx: true },
        }),
      ]);

      // 이름, 이메일, 휴대폰 번호 중복 검사 ( 응답 )
      if (exUserList[0] && exUserList[0].idx !== +body.idx)
        return res.status(409).json({ message: "별칭이 이미 존재합니다." });
      if (exUserList[1] && exUserList[1].idx !== +body.idx)
        return res.status(409).json({ message: "이메일이 이미 존재합니다." });
      if (exUserList[2] && exUserList[2].idx !== +body.idx)
        return res.status(409).json({ message: "폰번호가 이미 존재합니다." });

      // 중복된 데이터가 아니라면 유저 정보 수정
      await prisma.user.update({ where: { idx: body.idx }, data: body });

      return res
        .status(200)
        .json({ message: `"${body.nickname}"님의 데이터를 수정했습니다.` });
    }
  } catch (error) {
    console.error("/api/user error >> ", error);

    return res
      .status(500)
      .json({ message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!" });
  }
};

export default withAuthMiddleware({
  methods: ["GET", "PATCH"],
  handler,
  isAuth: true,
});
