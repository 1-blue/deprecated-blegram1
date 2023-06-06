import type { ApiResponse } from ".";

// ============================== 북마크 업로드 ==============================
/** 2023/05/02 - 북마크 업로드 요청 송신 타입 - by 1-blue */
export interface ApiUploadBookmarkRequest {
  postIdx: number;
}
/** 2023/05/02 - 북마크 업로드 요청 수신 타입 - by 1-blue */
export interface ApiUploadBookmarkResponse extends ApiResponse {
  bookmarkerIdx: number;
  bookmarkedIdx: number;
}
/** 2023/05/02 - 북마크 업로드 요청 핸들러 - by 1-blue */
export interface ApiUploadBookmarkHandler {
  (body: ApiUploadBookmarkRequest): Promise<ApiUploadBookmarkResponse>;
}

// ============================== 북마크 제거 ==============================
/** 2023/05/02 - 북마크 제거 요청 송신 타입 - by 1-blue */
export interface ApiDeleteBookmarkRequest {
  postIdx: number;
}
/** 2023/05/02 - 북마크 제거 요청 수신 타입 - by 1-blue */
export interface ApiDeleteBookmarkResponse extends ApiResponse {
  bookmarkerIdx: number;
  bookmarkedIdx: number;
}
/** 2023/05/02 - 북마크 제거 요청 핸들러 - by 1-blue */
export interface ApiDeleteBookmarkHandler {
  (body: ApiDeleteBookmarkRequest): Promise<ApiDeleteBookmarkResponse>;
}
