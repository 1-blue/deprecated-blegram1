// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type {
  ApiUploadPostRequest,
  ApiUploadPostResponse,
} from "@src/types/api";

/** 2023/04/08 - 게시글 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<ApiUploadPostResponse> = async (req, res) => {
  try {
    // 게시글 업로드 요청
    if (req.method === "POST") {
      const { contents, photoPaths } = req.body as ApiUploadPostRequest;

      if (!req.user) {
        return res.status(401).json({ message: "로그인후에 접근해주세요!" });
      }

      const createdPost = await prisma.post.create({
        data: {
          contents,
          photos: photoPaths.join("|"),
          createdAt: new Date(),
          userIdx: req.user?.idx,
        },
      });

      return res
        .status(200)
        .json({
          message: "게시글을 업로드했습니다.\n메인 페이지로 이동됩니다.",
          createdPost,
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
