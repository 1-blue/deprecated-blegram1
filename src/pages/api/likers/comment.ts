// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type {
  ApiFetchCommentLikersResponse,
  ApiResponse,
} from "@src/types/api";

/** 2023/04/28 - 댓글에 좋아요를 누른 사람들 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<
  ApiFetchCommentLikersResponse | ApiResponse
> = async (req, res) => {
  try {
    // 댓글에 좋아요 누른 사람들 요청
    if (req.method === "GET") {
      const take = +(req.query.take as string);
      const lastIdx = +(req.query.lastIdx as string);
      const commentIdx = +(req.query.commentIdx as string);

      // 존재하지 않는 댓글에 요청
      const exComment = await prisma.comment.findUnique({
        where: { idx: commentIdx },
      });
      if (!exComment)
        return res.status(404).json({ message: "존재하지 않는 댓글입니다." });

      const likers = await prisma.commentLike.findMany({
        where: { commentLikedIdx: commentIdx },
        include: {
          commentLiker: {
            select: {
              idx: true,
              nickname: true,
              avatar: true,
              name: true,
              // 로그인한 유저가 게시글 작성자를 팔로우했는지 판단
              followers: { where: { followingIdx: req.user?.idx || -1 } },
            },
          },
        },
        take,
        skip: lastIdx === -1 ? 0 : 1,
        ...(lastIdx !== -1 && {
          cursor: {
            commentLikedIdx_commentLikerIdx: {
              commentLikedIdx: commentIdx,
              commentLikerIdx: lastIdx,
            },
          },
        }),
        orderBy: { createdAt: "desc" },
      });

      return res.status(200).json({
        message: "댓글에 좋아요를 누른 유저들을 가져왔습니다.",
        likers,
      });
    }
  } catch (error) {
    console.error("/api/likers/comment error >> ", error);

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
