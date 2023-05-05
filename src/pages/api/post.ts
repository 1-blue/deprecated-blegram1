// prisma
import { prisma } from "@src/prisma";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// util
import { getRegExp } from "@src/utils";

// type
import type { NextApiHandler } from "next";
import type {
  ApiDeletePostResponse,
  ApiUploadPostRequest,
  ApiUploadPostResponse,
} from "@src/types/api";

/** 2023/04/08 - 게시글 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<
  ApiUploadPostResponse | ApiDeletePostResponse
> = async (req, res) => {
  try {
    // 게시글 업로드 요청
    if (req.method === "POST") {
      const { content, photoPaths } = req.body as ApiUploadPostRequest;

      if (!req.user) {
        return res.status(401).json({ message: "로그인후에 접근해주세요!" });
      }

      const createdPost = await prisma.post.create({
        data: {
          content,
          photos: photoPaths.join("|"),
          createdAt: new Date(),
          userIdx: req.user?.idx,
        },
        include: {
          user: {
            select: {
              idx: true,
              avatar: true,
              nickname: true,
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

      // 해시태그 추출
      const hashtags = content
        .split(getRegExp("hashtag"))
        .filter((hashtag) => hashtag.startsWith("#") && hashtag.length >= 2)
        .map((hashtag) => hashtag.slice(1));

      // 해시태그가 존재한다면
      if (hashtags.length > 0) {
        // 해시태그가 있다면 해시태그들 생성
        await prisma.hashtag.createMany({
          data: hashtags.map((hashtag) => ({ content: hashtag })),
          skipDuplicates: true,
        });

        // 게시글과 해시태그 연결
        await prisma.postHashtag.createMany({
          data: hashtags.map((hashtag) => ({
            postHashtagerIdx: createdPost.idx,
            postHashtagedIdx: hashtag,
          })),
          skipDuplicates: true,
        });
      }

      return res.status(200).json({
        message: "게시글을 업로드했습니다.\n메인 페이지로 이동됩니다.",
        createdPost,
      });
    }
    // 게시글 삭제 요청
    if (req.method === "DELETE") {
      const idx = +req.query.idx!;

      if (!req.user) {
        return res.status(401).json({ message: "로그인후에 접근해주세요!" });
      }

      await prisma.post.delete({ where: { idx } });

      return res.status(204).json({ message: "게시글을 삭제했습니다." });
    }
  } catch (error) {
    console.error("/api/post error >> ", error);

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
