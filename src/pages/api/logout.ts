// lib
import withAuthMiddleware from "@src/lib/middleware";

// util
import { clearCookie } from "@src/utils";

// type
import type { NextApiHandler } from "next";
import type { ApiLogOutResponse } from "@src/types/api";

/** 2023/03/31 - 로그아웃 엔드포인트 - by 1-blue */
const handler: NextApiHandler<ApiLogOutResponse> = async (req, res) => {
  if (!req.user) {
    return res.status(403).json({ message: "로그인후에 접근해주세요!" });
  }

  try {
    // 쿠키에서 인증/리프래쉬 토큰 갖고오기
    const { bat, brt } = req.cookies;

    // 토큰을 담은 쿠키 제거 ( 로그아웃 )
    res.setHeader("Set-Cookie", [
      clearCookie("brt", brt),
      clearCookie("bat", bat),
    ]);

    return res.status(204).json({
      message: "로그아웃되었습니다.\n로그인 페이지로 이동됩니다.",
    });
  } catch (error) {
    console.error("/api/logout error >> ", error);

    return res
      .status(500)
      .json({ message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!" });
  }
};

export default withAuthMiddleware({
  methods: ["POST"],
  handler,
  isAuth: true,
});
