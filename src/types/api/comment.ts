import type { ApiResponse, CommentsWithData } from ".";
import type { Comment } from "@prisma/client";

// ============================== 댓글 업로드 ==============================
/** 2023/04/18 - 댓글 업로드 요청 송신 타입 - by 1-blue */
export interface ApiUploadCommentRequest {
  postIdx: number;
  content: string;
}
/** 2023/04/18 - 댓글 업로드 요청 수신 타입 - by 1-blue */
export interface ApiUploadCommentResponse extends ApiResponse {
  createdComment: CommentsWithData;
}
/** 2023/04/18 - 댓글 업로드 요청 핸들러 - by 1-blue */
export interface ApiUploadCommentHandler {
  (body: ApiUploadCommentRequest): Promise<ApiUploadCommentResponse>;
}

// ============================== 댓글 수정 ==============================
/** 2023/04/21 - 댓글 수정 요청 송신 타입 - by 1-blue */
export interface ApiUpdateCommentRequest extends Pick<Comment, "content"> {
  commentIdx: number;
}
/** 2023/04/21 - 댓글 수정 요청 수신 타입 - by 1-blue */
export interface ApiUpdateCommentResponse extends ApiResponse {}
/** 2023/04/21 - 댓글 수정 요청 핸들러 - by 1-blue */
export interface ApiUpdateCommentHandler {
  (body: ApiUpdateCommentRequest): Promise<ApiUpdateCommentResponse>;
}

// ============================== 댓글 제거 ==============================
/** 2023/04/21 - 댓글 제거 요청 송신 타입 - by 1-blue */
export interface ApiDeleteCommentRequest {
  commentIdx: number;
}
/** 2023/04/21 - 댓글 제거 요청 수신 타입 - by 1-blue */
export interface ApiDeleteCommentResponse extends ApiResponse {}
/** 2023/04/21 - 댓글 제거 요청 핸들러 - by 1-blue */
export interface ApiDeleteCommentHandler {
  (body: ApiDeleteCommentRequest): Promise<ApiDeleteCommentResponse>;
}
