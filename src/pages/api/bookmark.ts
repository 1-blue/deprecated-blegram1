// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type {
  ApiUploadBookmarkResponse,
  ApiDeleteBookmarkResponse,
  ApiUploadBookmarkRequest,
  ApiResponse,
} from "@src/types/api";

/** 2023/05/02 - 북마크 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<
  ApiUploadBookmarkResponse | ApiDeleteBookmarkResponse | ApiResponse
> = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "로그인후에 접근해주세요!" });
  }

  try {
    // 북마크 업로드 요청
    if (req.method === "POST") {
      const { postIdx } = req.body as ApiUploadBookmarkRequest;

      await prisma.bookmark.create({
        data: {
          bookmarkerIdx: req.user.idx,
          bookmarkedIdx: postIdx,
          createdAt: new Date(),
        },
      });

      return res.status(201).json({
        message: "게시글에 북마크를 추가했습니다.",
        bookmarkerIdx: req.user.idx,
        bookmarkedIdx: postIdx,
      });
    }
    // 북마크 제거 요청
    if (req.method === "DELETE") {
      const postIdx = +req.query.postIdx!;

      await prisma.bookmark.delete({
        where: {
          bookmarkerIdx_bookmarkedIdx: {
            bookmarkerIdx: req.user.idx,
            bookmarkedIdx: postIdx,
          },
        },
      });

      return res.status(200).json({
        message: "게시글의 북마크를 제거했습니다.",
        bookmarkerIdx: req.user.idx,
        bookmarkedIdx: postIdx,
      });
    }
  } catch (error) {
    console.error("/api/bookmark error >> ", error);

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
