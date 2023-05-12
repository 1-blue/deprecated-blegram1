// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type { ApiFetchPostsResponse } from "@src/types/api";

/** 2023/04/08 - 게시글들 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<ApiFetchPostsResponse> = async (req, res) => {
  try {
    // 모든 게시글들 가져오기 요청
    if (req.method === "GET") {
      const take = +(req.query.take as string);
      const lastIdx = +(req.query.lastIdx as string);

      const posts = await prisma.post.findMany({
        where: {},
        take,
        skip: lastIdx === -1 ? 0 : 1,
        ...(lastIdx !== -1 && { cursor: { idx: lastIdx } }),
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              idx: true,
              avatar: true,
              nickname: true,
              // 로그인한 유저가 게시글 작성자를 팔로우했는지 판단
              followings: { where: { followingIdx: req.user?.idx || -1 } },
            },
          },
          // 로그인한 유저가 게시글에 좋아요 눌렀는지 판단
          postLikers: { where: { postLikerIdx: req.user?.idx || -1 } },
          // 로그인한 유저가 게시글에 북마크 눌렀는지 판단
          bookMarkers: { where: { bookmarkerIdx: req.user?.idx || -1 } },
          _count: {
            select: {
              comments: true,
              postLikers: true,
            },
          },
        },
      });

      return res.status(200).json({
        message: `최신 게시글 ${posts.length}개를 가져왔습니다.`,
        posts,
      });
    }
  } catch (error) {
    console.error("/api/posts error >> ", error);

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
