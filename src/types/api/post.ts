import type { ApiResponse } from ".";
import type { Post } from "@prisma/client";

// ============================== 게시글 업로드 정보 ==============================
/** 2023/04/08 - 게시글 업로드 요청 송신 타입 - by 1-blue */
export interface ApiUploadPostRequest extends Pick<Post, "contents"> {
  photoPaths: string[];
}
/** 2023/04/08 - 게시글 업로드 요청 수신 타입 - by 1-blue */
export interface ApiUploadPostResponse extends ApiResponse {
  createdPost?: Post;
}
/** 2023/04/08 - 게시글 업로드 요청 핸들러 - by 1-blue */
export interface ApiUploadPostHandler {
  (body: ApiUploadPostRequest): Promise<ApiUploadPostResponse>;
}
