// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type {
  ApiResponse,
  ApiUploadCommentResponse,
  ApiUploadCommentRequest,
} from "@src/types/api";

/** 2023/04/18 - 댓글 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<ApiUploadCommentResponse | ApiResponse> = async (
  req,
  res
) => {
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
      });

      return res.status(200).json({
        message: "댓글을 업로드했습니다.\n메인 페이지로 이동됩니다.",
        createdComment,
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
  methods: ["POST"],
  handler,
  isAuth: true,
});
