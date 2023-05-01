import type { ApiResponse } from ".";

// ============================== 게시글 좋아요 추가 요청 ==============================
/** 2023/04/24 - 게시글 좋아요 추가 요청 송신 타입 - by 1-blue */
export interface ApiUploadLikeOfPostRequest {
  postIdx: number;
}
/** 2023/04/24 - 게시글 좋아요 추가 요청 수신 타입 - by 1-blue */
export interface ApiUploadLikeOfPostResponse extends ApiResponse {
  postLikerIdx: number;
}
/** 2023/04/24 - 게시글 좋아요 추가 요청 핸들러 - by 1-blue */
export interface ApiUploadLikeOfPostHandler {
  (body: ApiUploadLikeOfPostRequest): Promise<ApiUploadLikeOfPostResponse>;
}

// ============================== 게시글 좋아요 취소 요청  ==============================
/** 2023/04/24 - 게시글 좋아요 취소 요청 송신 타입 - by 1-blue */
export interface ApiDeleteLikeOfPostRequest {
  postIdx: number;
}
/** 2023/04/24 - 게시글 좋아요 취소 요청 수신 타입 - by 1-blue */
export interface ApiDeleteLikeOfPostResponse extends ApiResponse {
  postLikerIdx: number;
}
/** 2023/04/24 - 게시글 좋아요 취소 요청 핸들러 - by 1-blue */
export interface ApiDeleteLikeOfPostHandler {
  (body: ApiDeleteLikeOfPostRequest): Promise<ApiDeleteLikeOfPostResponse>;
}

// ============================== 댓글 좋아요 추가 요청 ==============================
/** 2023/04/27 - 댓글 좋아요 추가 요청 송신 타입 - by 1-blue */
export interface ApiUploadLikeOfCommentRequest {
  postIdx: number;
  commentIdx: number;
}
/** 2023/04/27 - 댓글 좋아요 추가 요청 수신 타입 - by 1-blue */
export interface ApiUploadLikeOfCommentResponse extends ApiResponse {
  commentLikerIdx: number;
}
/** 2023/04/27 - 댓글 좋아요 추가 요청 핸들러 - by 1-blue */
export interface ApiUploadLikeOfCommentHandler {
  (
    body: ApiUploadLikeOfCommentRequest
  ): Promise<ApiUploadLikeOfCommentResponse>;
}

// ============================== 댓글 좋아요 취소 요청  ==============================
/** 2023/04/27 - 댓글 좋아요 취소 요청 송신 타입 - by 1-blue */
export interface ApiDeleteLikeOfCommentRequest {
  postIdx: number;
  commentIdx: number;
}
/** 2023/04/27 - 댓글 좋아요 취소 요청 수신 타입 - by 1-blue */
export interface ApiDeleteLikeOfCommentResponse extends ApiResponse {
  commentLikerIdx: number;
}
/** 2023/04/27 - 댓글 좋아요 취소 요청 핸들러 - by 1-blue */
export interface ApiDeleteLikeOfCommentHandler {
  (
    body: ApiDeleteLikeOfCommentRequest
  ): Promise<ApiDeleteLikeOfCommentResponse>;
}
