import type { Follow } from "@prisma/client";
import type { ApiResponse, PageInfo, SimpleUserWithName } from ".";

// ============================== 팔로잉들 ==============================
/** 2023/05/12 - 팔로잉들 요청 송신 타입 - by 1-blue */
export interface ApiFetchFollowingsRequest extends PageInfo {
  followingIdx: number;
}
/** 2023/05/12 - 팔로잉들 요청 수신 타입 - by 1-blue */
export interface ApiFetchFollowingsResponse extends ApiResponse {
  followings: (SimpleUserWithName & { followers: Follow[] })[];
}
/** 2023/05/12 - 팔로잉들 요청 핸들러 - by 1-blue */
export interface ApiFetchFollowingsHandler {
  (body: ApiFetchFollowingsRequest): Promise<ApiFetchFollowingsResponse>;
}
