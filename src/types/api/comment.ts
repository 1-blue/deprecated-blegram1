import type { ApiResponse } from ".";
import type { Comment } from "@prisma/client";

// ============================== 댓글 업로드 정보 ==============================
/** 2023/04/18 - 댓글 업로드 요청 송신 타입 - by 1-blue */
export interface ApiUploadCommentRequest {
  postIdx: number;
  content: string;
}
/** 2023/04/18 - 댓글 업로드 요청 수신 타입 - by 1-blue */
export interface ApiUploadCommentResponse extends ApiResponse {
  createdComment: Comment;
}
/** 2023/04/18 - 댓글 업로드 요청 핸들러 - by 1-blue */
export interface ApiUploadCommentHandler {
  (body: ApiUploadCommentRequest): Promise<ApiUploadCommentResponse>;
}
