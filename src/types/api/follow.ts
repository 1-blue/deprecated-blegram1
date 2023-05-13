import type { ApiResponse } from ".";

// ============================== 팔로우 ==============================
/** 2023/05/09 - 팔로우 요청 송신 타입 - by 1-blue */
export interface ApiCreateFollowRequest {
  userIdx: number;
  postIdx?: number;
  commentIdx?: number;
  followerIdx?: number;
  followingIdx?: number;
  nickname?: string;
}
/** 2023/05/09 - 팔로우 요청 수신 타입 - by 1-blue */
export interface ApiCreateFollowResponse extends ApiResponse {
  followerIdx: number;
  followingIdx: number;
}
/** 2023/05/09 - 팔로우 요청 핸들러 - by 1-blue */
export interface ApiCreateFollowHandler {
  (body: ApiCreateFollowRequest): Promise<ApiCreateFollowResponse>;
}

// ============================== 언팔로우 ==============================
/** 2023/05/09 - 언팔로우 요청 송신 타입 - by 1-blue */
export interface ApiDeleteFollowRequest {
  userIdx: number;
  postIdx?: number;
  commentIdx?: number;
  followerIdx?: number;
  followingIdx?: number;
  nickname?: string;
}
/** 2023/05/09 - 언팔로우 요청 수신 타입 - by 1-blue */
export interface ApiDeleteFollowResponse extends ApiResponse {
  followerIdx: number;
  followingIdx: number;
}
/** 2023/05/09 - 언팔로우 요청 핸들러 - by 1-blue */
export interface ApiDeleteFollowHandler {
  (body: ApiDeleteFollowRequest): Promise<ApiDeleteFollowResponse>;
}
