import type { ApiResponse } from ".";
import type { PostLikes, User } from "@prisma/client";

// ============================== 게시글 좋아요 누른 사람들 요청 ==============================
/** 2023/04/25 - 게시글 좋아요 누른 사람들 요청 송신 타입 - by 1-blue */
export interface ApiFetchPostLikersRequest {
  postIdx: number;
  take: number;
  lastIdx: number;
}
/** 2023/04/25 - 게시글 좋아요 누른 사람들 요청 수신 타입 - by 1-blue */
export interface ApiFetchPostLikersResponse extends ApiResponse {
  likers: (PostLikes & {
    postLiker: Pick<User, "idx" | "name" | "nickname" | "avatar">;
  })[];
}
/** 2023/04/25 - 게시글 좋아요 누른 사람들 요청 핸들러 - by 1-blue */
export interface ApiFetchPostLikersHandler {
  (body: ApiFetchPostLikersRequest): Promise<ApiFetchPostLikersResponse>;
}
