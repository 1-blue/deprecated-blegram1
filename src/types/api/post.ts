import type { ApiResponse, PostWithData } from ".";
import type { Post } from "@prisma/client";

// ============================== 게시글 가져오기 ==============================
/** 2023/06/02 - 게시글 가져오기 요청 송신 타입 - by 1-blue */
export interface ApiFetchPostRequest {
  postIdx: number;
}
/** 2023/06/02 - 게시글 가져오기 요청 수신 타입 - by 1-blue */
export interface ApiFetchPostResponse extends ApiResponse {
  post: PostWithData;
}
/** 2023/06/02 - 게시글 가져오기 요청 핸들러 - by 1-blue */
export interface ApiFetchPostHandler {
  (body: ApiFetchPostRequest): Promise<ApiFetchPostResponse>;
}

// ============================== 게시글 업로드 ==============================
/** 2023/04/08 - 게시글 업로드 요청 송신 타입 - by 1-blue */
export interface ApiUploadPostRequest extends Pick<Post, "content"> {
  photoPaths: string[];
}
/** 2023/04/08 - 게시글 업로드 요청 수신 타입 - by 1-blue */
export interface ApiUploadPostResponse extends ApiResponse {
  createdPost: PostWithData;
}
/** 2023/04/08 - 게시글 업로드 요청 핸들러 - by 1-blue */
export interface ApiUploadPostHandler {
  (body: ApiUploadPostRequest): Promise<ApiUploadPostResponse>;
}

// ============================== 게시글 제거 ==============================
/** 2023/04/11 - 게시글 제거 요청 송신 타입 - by 1-blue */
export interface ApiDeletePostRequest extends Pick<Post, "idx"> {}
/** 2023/04/11 - 게시글 제거 요청 수신 타입 - by 1-blue */
export interface ApiDeletePostResponse extends ApiResponse {}
/** 2023/04/11 - 게시글 제거 요청 핸들러 - by 1-blue */
export interface ApiDeletePostHandler {
  (body: ApiDeletePostRequest): Promise<ApiDeletePostResponse>;
}
