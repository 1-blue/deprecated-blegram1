// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type {
  ApiUploadCommentResponse,
  ApiUploadCommentRequest,
  ApiDeleteCommentResponse,
  ApiUpdateCommentRequest,
} from "@src/types/api";

/** 2023/04/18 - 댓글 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<
  ApiUploadCommentResponse | ApiDeleteCommentResponse
> = async (req, res) => {
  try {
    // 댓글 업로드 요청
    if (req.method === "POST") {
      const { postIdx, content } = req.body as ApiUploadCommentRequest;

      if (!req.user) {
        return res.status(401).json({ message: "로그인후에 접근해주세요!" });
      }

      const createdComment = await prisma.comment.create({
        data: {
          content,
          createdAt: new Date(),
          postIdx: +postIdx,
          userIdx: req.user.idx,
        },
        include: {
          user: {
            select: {
              idx: true,
              avatar: true,
              nickname: true,
            },
          },
          commentLikers: {
            select: {
              commentLiker: {
                select: {
                  idx: true,
                  avatar: true,
                  nickname: true,
                },
              },
            },
          },
          _count: {
            select: {
              commentLikers: true,
            },
          },
        },
      });

      return res.status(200).json({
        message: "댓글을 업로드했습니다.",
        createdComment,
      });
    }
    // 댓글 수정 요청
    if (req.method === "PATCH") {
      const { idx, content } = req.body as ApiUpdateCommentRequest;

      if (!req.user) {
        return res.status(401).json({ message: "로그인후에 접근해주세요!" });
      }

      await prisma.comment.update({ where: { idx }, data: { content } });

      return res.status(200).json({ message: "댓글을 수정했습니다." });
    }
    // 댓글 제거 요청
    if (req.method === "DELETE") {
      const idx = +req.query.idx!;

      if (!req.user) {
        return res.status(401).json({ message: "로그인후에 접근해주세요!" });
      }

      await prisma.comment.delete({ where: { idx } });

      return res.status(204).json({ message: "댓글을 삭제했습니다." });
    }
  } catch (error) {
    console.error("/api/user error >> ", error);

    return res
      .status(500)
      .json({ message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!" });
  }
};

export default withAuthMiddleware({
  methods: ["POST", "PATCH", "DELETE"],
  handler,
  isAuth: true,
});
