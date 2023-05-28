// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type { ApiFetchUserResponse } from "@src/types/api";

/** 2023/03/29 - 특정 유저 정보 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<ApiFetchUserResponse> = async (req, res) => {
  try {
    // 특정 유저의 정보 요청
    if (req.method === "GET") {
      const { nickname } = req.query;

      // 타입 문제 때문에 작성 ( 이론상 여기 걸릴 수 없음 )
      if (typeof nickname !== "string") return;

      // 특정 유저 찾기
      const exUser = await prisma.user.findUnique({
        where: { nickname },
        select: {
          idx: true,
          name: true,
          nickname: true,
          introduction: true,
          avatar: true,
          _count: {
            select: {
              posts: true,
              followers: true,
              followings: true,
            },
          },
        },
      });

      // 찾는 유저가 없는 경우
      if (!exUser) {
        return res.status(404).json({ message: "존재하지 않는 유저입니다." });
      }

      return res.status(200).json({
        message: `"${exUser.nickname}"님의 정보를 가져왔습니다.`,
        user: exUser,
      });
    }
  } catch (error) {
    console.error("/api/user error >> ", error);

    return res
      .status(500)
      .json({ message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!" });
  }
};

export default withAuthMiddleware({
  methods: ["GET"],
  handler,
  isAuth: false,
});
