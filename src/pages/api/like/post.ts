// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type {
  ApiUploadLikeOfPostResponse,
  ApiUploadLikeOfPostRequest,
  ApiDeleteLikeOfPostResponse,
  ApiResponse,
} from "@src/types/api";

/** 2023/04/24 - 게시글 좋아요 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<
  ApiUploadLikeOfPostResponse | ApiDeleteLikeOfPostResponse | ApiResponse
> = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "로그인후에 접근해주세요!" });
  }

  try {
    // 게시글 좋아요 추가 요청
    if (req.method === "POST") {
      const { postIdx } = req.body as ApiUploadLikeOfPostRequest;

      // 존재하지 않는 게시글에 좋아요 추가 요청
      const exPost = await prisma.post.findUnique({ where: { idx: +postIdx } });
      if (!exPost)
        return res.status(404).json({ message: "존재하지 않는 게시글입니다." });

      await prisma.postLike.create({
        data: {
          postLiker: { connect: { idx: req.user.idx } },
          postLiked: { connect: { idx: postIdx } },
          createdAt: new Date(),
        },
      });

      return res.status(201).json({
        message: "게시글에 좋아요를 추가했습니다.",
        postLikerIdx: req.user.idx,
      });
    }
    // 게시글 좋아요 삭제 요청
    if (req.method === "DELETE") {
      const postIdx = +req.query.postIdx!;

      // 존재하지 않는 게시글에 좋아요 제거 요청
      const exPost = await prisma.post.findUnique({ where: { idx: +postIdx } });
      if (!exPost)
        return res.status(404).json({ message: "존재하지 않는 게시글입니다." });

      await prisma.postLike.delete({
        where: {
          postLikedIdx_postLikerIdx: {
            postLikerIdx: req.user.idx,
            postLikedIdx: postIdx,
          },
        },
      });

      return res.status(200).json({
        message: "게시글의 좋아요를 제거했습니다.",
        postLikerIdx: req.user.idx,
      });
    }
  } catch (error) {
    console.error("/api/like/post error >> ", error);

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
