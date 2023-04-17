// aws
import { getPresignedURL } from "@src/aws";

// lib
import withAuthMiddleware from "@src/lib/middleware";

// type
import type { NextApiHandler } from "next";
import type {
  ApiFetchPresignedURLsRequest,
  ApiFetchPresignedURLsResponse,
  ApiResponse,
} from "@src/types/api";

interface MyResponseType
  extends Partial<ApiFetchPresignedURLsResponse>,
    ApiResponse {}

/** 2023/04/08 - "AWS-S3"에 이미지들 생성 요청 관련 엔드포인트 - by 1-blue */
const handler: NextApiHandler<MyResponseType> = async (req, res) => {
  try {
    // "presignedURL"들 요청
    if (req.method === "POST") {
      const { names } = req.body as ApiFetchPresignedURLsRequest;

      const results = await Promise.all(
        names.map((name) => getPresignedURL({ name }))
      );

      const presignedURLs = results.map((v) => v.presignedURL);

      return res
        .status(200)
        .json({ message: "presignedURL들을 가져왔습니다.", presignedURLs });
    }
  } catch (error) {
    console.error("/api/photo error >> ", error);

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
