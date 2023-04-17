// prisma
import { prisma } from "@src/prisma";

// aws
import { movePhoto } from "@src/aws";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type {
  ApiUpdatePhotoRequest,
  ApiUpdatePhotoResponse,
} from "@src/types/api";

/** 2023/04/01 - 프로필 이미지 업로드 엔드포인트 - by 1-blue */
const handler: NextApiHandler<ApiUpdatePhotoResponse> = async (req, res) => {
  // 타입문제 때문에 작성 ( 이론상 여기에 걸리는 경우는 없음 )
  if (!req.user) return res.status(302).redirect(req.url || "/");

  try {
    // 프로필 이미지 업로드
    if (req.method === "PATCH") {
      const { avatarPath } = req.body as ApiUpdatePhotoRequest;

      // 기존 이미지가 있다면 제거로 이동
      if (req.user.avatar) await movePhoto(req.user.avatar);

      // 프로필 이미지 수정
      await prisma.user.update({
        where: { idx: req.user.idx },
        data: { avatar: avatarPath },
      });

      return res
        .status(200)
        .json({ message: "프로필 이미지를 업로드했습니다." });
    }
  } catch (error) {
    console.error("/api/me/photo error >> ", error);

    return res
      .status(500)
      .json({ message: "서버측 문제입니다.\n잠시후에 다시 시도해주세요!" });
  }
};

export default withAuthMiddleware({
  methods: ["PATCH"],
  handler,
  isAuth: true,
});
