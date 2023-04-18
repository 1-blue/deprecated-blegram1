import { serverInstance } from ".";

// type
import type {
  ApiUploadCommentResponse,
  ApiUploadCommentHandler,
} from "@src/types/api";

/** 2023/04/18 - 댓글 업로드 요청 - by 1-blue */
const apiUploadComment: ApiUploadCommentHandler = async (body) => {
  const { data } = await serverInstance.post<ApiUploadCommentResponse>(
    "/comment",
    body
  );

  return data;
};

/** 2023/04/18 - 댓글 관련된 요청 - by 1-blue */
export const apiServiceComment = {
  /** 2023/04/18 - 댓글 업로드 요청 - by 1-blue */
  apiUploadComment,
};
