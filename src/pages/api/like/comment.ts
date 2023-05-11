// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type {
  ApiUploadLikeOfCommentResponse,
  ApiUploadLikeOfCommentRequest,
  ApiDeleteLikeOfCommentResponse,
  ApiResponse,
} from "@src/types/api";

/** 2023/04/27 - 댓글 좋아요 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<
  ApiUploadLikeOfCommentResponse | ApiDeleteLikeOfCommentResponse | ApiResponse
> = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "로그인후에 접근해주세요!" });
  }

  try {
    // 댓글 좋아요 추가 요청
    if (req.method === "POST") {
      const { commentIdx } = req.body as ApiUploadLikeOfCommentRequest;

      await prisma.commentLike.create({
        data: {
          commentLiker: { connect: { idx: req.user.idx } },
          commentLiked: { connect: { idx: commentIdx } },
          createdAt: new Date(),
        },
      });

      return res.status(201).json({
        message: "댓글에 좋아요를 추가했습니다.",
        commentLikerIdx: req.user.idx,
      });
    }
    // 댓글 좋아요 삭제 요청
    if (req.method === "DELETE") {
      const commentIdx = +req.query.commentIdx!;

      await prisma.commentLike.delete({
        where: {
          commentLikedIdx_commentLikerIdx: {
            commentLikerIdx: req.user.idx,
            commentLikedIdx: commentIdx,
          },
        },
      });

      return res.status(200).json({
        message: "댓글의 좋아요를 제거했습니다.",
        commentLikerIdx: req.user.idx,
      });
    }
  } catch (error) {
    console.error("/api/like/comment error >> ", error);

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
