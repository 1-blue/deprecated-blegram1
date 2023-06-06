import type { ApiResponse, PageInfo, SimpleUser } from ".";
import type { Bookmark, Follow, Post, PostLike } from "@prisma/client";

/** 2023/04/19 - 응답받을 게시글의 타입 - by 1-blue */
export interface PostWithData extends Post {
  user: SimpleUser & { followers: Follow[] };
  postLikers: PostLike[];
  bookMarkers: Bookmark[];
  _count: {
    comments: number;
    postLikers: number;
  };
}

// ============================== 게시글들 가져오기 요청 ==============================
/** 2023/04/08 - 게시글들 가져오기 요청 송신 타입 - by 1-blue */
export interface ApiFetchPostsRequest extends PageInfo {}
/** 2023/04/08 - 게시글들 가져오기 요청 수신 타입 - by 1-blue */
export interface ApiFetchPostsResponse extends ApiResponse {
  posts?: PostWithData[];
}
/** 2023/04/08 - 게시글들 가져오기 요청 핸들러 - by 1-blue */
export interface ApiFetchPostsHandler {
  (body: ApiFetchPostsRequest): Promise<ApiFetchPostsResponse>;
}

// ============================== 특정 유저가 작성한 게시글들 ==============================
/** 2023/05/26 - 특정 유저가 작성한 게시글들 요청 송신 타입 - by 1-blue */
export interface ApiFetchWrittenPostsRequest extends PageInfo {
  nickname: string;
}
/** 2023/05/26 - 특정 유저가 작성한 게시글들 요청 수신 타입 - by 1-blue */
export interface ApiFetchWrittenPostsResponse extends ApiResponse {
  posts?: PostWithData[];
}
/** 2023/05/26 - 특정 유저가 작성한 게시글들 요청 핸들러 - by 1-blue */
export interface ApiFetchWrittenPostsHandler {
  (body: ApiFetchWrittenPostsRequest): Promise<ApiFetchWrittenPostsResponse>;
}

// ============================== 특정 유저가 북마크한 게시글들 ==============================
/** 2023/05/26 - 특정 유저가 북마크한 게시글들 요청 송신 타입 - by 1-blue */
export interface ApiFetchBookmarkedPostsRequest extends PageInfo {
  nickname: string;
}
/** 2023/05/26 - 특정 유저가 북마크한 게시글들 요청 수신 타입 - by 1-blue */
export interface ApiFetchBookmarkedPostsResponse extends ApiResponse {
  posts?: PostWithData[];
}
/** 2023/05/26 - 특정 유저가 북마크한 게시글들 요청 핸들러 - by 1-blue */
export interface ApiFetchBookmarkedPostsHandler {
  (
    body: ApiFetchBookmarkedPostsRequest
  ): Promise<ApiFetchBookmarkedPostsResponse>;
}

// ============================== 특정 유저가 좋아요한 게시글들 ==============================
/** 2023/05/26 - 특정 유저가 좋아요한 게시글들 요청 송신 타입 - by 1-blue */
export interface ApiFetchLikedPostsRequest extends PageInfo {
  nickname: string;
}
/** 2023/05/26 - 특정 유저가 좋아요한 게시글들 요청 수신 타입 - by 1-blue */
export interface ApiFetchLikedPostsResponse extends ApiResponse {
  posts?: PostWithData[];
}
/** 2023/05/26 - 특정 유저가 좋아요한 게시글들 요청 핸들러 - by 1-blue */
export interface ApiFetchLikedPostsHandler {
  (body: ApiFetchLikedPostsRequest): Promise<ApiFetchLikedPostsResponse>;
}
