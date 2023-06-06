// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type { ApiFetchSuggestedResponse, ApiResponse } from "@src/types/api";

/** 2023/05/05 - 추천 검색어 엔드포인트 - by 1-blue */
const handler: NextApiHandler<ApiFetchSuggestedResponse | ApiResponse> = async (
  req,
  res
) => {
  try {
    // 모든 게시글들 가져오기 요청
    if (req.method === "GET") {
      const query = req.query.query as string;

      const [hashtags, users] = await Promise.all([
        // 해시태그가 포함된 게시글들 검색
        prisma.hashtag.findMany({
          where: {
            postHashtagers: {
              every: {
                postHashtagedIdx: {
                  contains: query,
                },
              },
            },
          },
          take: 6,
          orderBy: {
            postHashtagers: {
              _count: "desc",
            },
          },
        }),
        // 유저 검색
        prisma.user.findMany({
          where: {
            nickname: {
              contains: query,
            },
          },
          select: {
            idx: true,
            name: true,
            nickname: true,
            avatar: true,
          },
          take: 6,
          // TODO: 팔로워 수를 기준으로 정렬하기
        }),
      ]);

      res.status(200).json({
        message: "추천 해시태그 및 유저들을 가져왔습니다.",
        hashtags,
        users,
      });
    }
  } catch (error) {
    console.error("/api/search/suggested error >> ", error);

    return res.status(500).json({
      message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!",
    });
  }
};

export default withAuthMiddleware({
  methods: ["GET"],
  handler,
  isAuth: false,
});
