// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type { ApiFetchMeResponse } from "@src/types/api";

const handler: NextApiHandler<ApiFetchMeResponse> = async (req, res) => {
  // 로그인한 유저의 정보 요청
  if (req.method === "GET") {
    // 타입문제 때문에 작성 ( 이론상 여기에 걸리는 경우는 없음 )
    if (!req.user) return res.status(302).redirect(req.url || "/");

    return res.status(200).json({
      message: `"${req.user.name}"님의 정보를 가져왔습니다.`,
      user: req.user,
    });
  }
};

export default withAuthMiddleware({
  methods: ["GET"],
  handler,
  isAuth: true,
});
