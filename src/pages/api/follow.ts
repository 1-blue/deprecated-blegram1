// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type {
  ApiResponse,
  ApiCreateFollowRequest,
  ApiCreateFollowResponse,
  ApiDeleteFollowResponse,
} from "@src/types/api";

/** 2023/05/09 - 팔로우 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<
  ApiCreateFollowResponse | ApiDeleteFollowResponse | ApiResponse
> = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "로그인후에 접근해주세요!" });
  }

  try {
    // 팔로우
    if (req.method === "POST") {
      const { userIdx } = req.body as ApiCreateFollowRequest;

      await prisma.follow.create({
        data: {
          followerIdx: userIdx,
          followingIdx: req.user.idx,
        },
      });

      return res.status(201).json({
        message: "팔로우했습니다.",
        followerIdx: userIdx,
        followingIdx: req.user.idx,
      });
    }
    // 언팔로우
    if (req.method === "DELETE") {
      const userIdx = +req.query.userIdx!;

      await prisma.follow.delete({
        where: {
          followerIdx_followingIdx: {
            followerIdx: userIdx,
            followingIdx: req.user.idx,
          },
        },
      });

      return res.status(200).json({
        message: "언팔로우했습니다.",
        followerIdx: userIdx,
        followingIdx: req.user.idx,
      });
    }
  } catch (error) {
    console.error("/api/follow error >> ", error);

    return res
      .status(500)
      .json({ message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!" });
  }
};

export default withAuthMiddleware({
  methods: ["POST", "DELETE"],
  handler,
  isAuth: true,
});
