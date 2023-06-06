import type { Follow } from "@prisma/client";
import type { ApiResponse, PageInfo, SimpleUserWithName } from ".";

// ============================== 팔로워들 ==============================
/** 2023/05/12 - 팔로워들 요청 송신 타입 - by 1-blue */
export interface ApiFetchFollowersRequest extends PageInfo {
  followerIdx: number;
}
/** 2023/05/12 - 팔로워들 요청 수신 타입 - by 1-blue */
export interface ApiFetchFollowersResponse extends ApiResponse {
  followers: (SimpleUserWithName & { followers: Follow[] })[];
}
/** 2023/05/12 - 팔로워들 요청 핸들러 - by 1-blue */
export interface ApiFetchFollowersHandler {
  (body: ApiFetchFollowersRequest): Promise<ApiFetchFollowersResponse>;
}
