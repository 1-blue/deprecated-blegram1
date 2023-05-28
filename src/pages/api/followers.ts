// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type { ApiResponse, ApiFetchFollowersResponse } from "@src/types/api";

/** 2023/05/12 - 팔로워 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<ApiResponse | ApiFetchFollowersResponse> = async (
  req,
  res
) => {
  try {
    // 특정 유저의 팔로워들 요청 - by 1-blue
    if (req.method === "GET") {
      const followerIdx = +(req.query.followerIdx as string);
      const take = +(req.query.take as string);
      const lastIdx = +(req.query.lastIdx as string);

      // 나를 팔로우하는 사람
      // 특정 유저를 팔로잉하는 유저들 ( 즉, 팔로워들 )
      const followers = (
        await prisma.follow.findMany({
          where: { followerIdx },
          take,
          skip: lastIdx === -1 ? 0 : 1,
          ...(lastIdx !== -1 && {
            cursor: {
              followerIdx_followingIdx: {
                followerIdx,
                followingIdx: lastIdx,
              },
            },
          }),
          select: {
            following: {
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
      ).map(({ following }) => following);

      return res
        .status(200)
        .json({ message: "특정 유저의 팔로워들을 가져왔습니다.", followers });
    }
  } catch (error) {
    console.error("/api/followers error >> ", error);

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
