// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type { ApiResponse, ApiFetchFollowingsResponse } from "@src/types/api";

/** 2023/05/12 - 팔로잉 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<
  ApiResponse | ApiFetchFollowingsResponse
> = async (req, res) => {
  try {
    // 특정 유저의 팔로잉들 요청 - by 1-blue
    if (req.method === "GET") {
      const followingIdx = +(req.query.followingIdx as string);
      const take = +(req.query.take as string);
      const lastIdx = +(req.query.lastIdx as string);

      // 내가 팔로우하는 사람
      // 특정 유저를 팔로우하는 유저들 ( 즉, 팔로잉들 )
      const followings = (
        await prisma.follow.findMany({
          where: { followingIdx },
          take,
          skip: lastIdx === -1 ? 0 : 1,
          ...(lastIdx !== -1 && {
            cursor: {
              followerIdx_followingIdx: {
                followerIdx: lastIdx,
                followingIdx,
              },
            },
          }),
          select: {
            follower: {
              select: {
                idx: true,
                avatar: true,
                name: true,
                nickname: true,
                // 로그인한 유저가 해당 유저를 팔로우했는지 판단
                followers: { where: { followingIdx: req.user?.idx || -1 } },
              },
            },
          },
        })
      ).map(({ follower }) => follower);

      return res
        .status(200)
        .json({ message: "특정 유저의 팔로잉들을 가져왔습니다.", followings });
    }
  } catch (error) {
    console.error("/api/followings error >> ", error);

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
