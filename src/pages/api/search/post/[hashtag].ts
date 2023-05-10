// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type { ApiFetchHashtagPostsResponse, ApiResponse } from "@src/types/api";

/** 2023/05/05 - 특정 해시태그를 갖는 게시들 검색 엔드포인트 - by 1-blue */
const handler: NextApiHandler<
  ApiFetchHashtagPostsResponse | ApiResponse
> = async (req, res) => {
  try {
    // 해시태그를 갖는 게시글들 가져오기
    if (req.method === "GET") {
      const hashtag = req.query.hashtag as string;
      const take = +(req.query.take as string);
      const skip = +(req.query.skip as string);

      const posts = (
        await prisma.hashtag.findMany({
          where: {
            postHashtagers: {
              every: {
                postHashtagedIdx: {
                  equals: hashtag,
                },
              },
            },
          },
          take,
          skip,
          orderBy: {
            postHashtagers: {
              _count: "desc",
            },
          },
          select: {
            postHashtagers: {
              include: {
                postHashtager: {
                  include: {
                    user: {
                      select: {
                        idx: true,
                        avatar: true,
                        nickname: true,
                        // 로그인한 유저가 게시글 작성자를 팔로우했는지 판단
                        followings: { where: { followingIdx: req.user?.idx } },
                      },
                    },
                    // 로그인한 유저가 게시글에 좋아요 눌렀는지 판단
                    postLikers: {
                      where: { postLikerIdx: req.user?.idx || -1 },
                    },
                    // 로그인한 유저가 게시글에 북마크 눌렀는지 판단
                    bookMarkers: {
                      where: { bookmarkerIdx: req.user?.idx || -1 },
                    },
                    _count: {
                      select: {
                        comments: true,
                        postLikers: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })
      )
        .map((hashtag) =>
          hashtag.postHashtagers.map(
            (postHashtager) => postHashtager.postHashtager
          )
        )
        .flat(1);

      res.status(200).json({
        message: `"#${hashtag}"인 게시글들을 가져왔습니다.`,
        posts,
      });
    }
  } catch (error) {
    console.error("/api/search/post/[query] error >> ", error);

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
