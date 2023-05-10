import type { ApiResponse, SimpleUserWithName } from ".";
import type { CommentLikes, Follow, PostLikes } from "@prisma/client";

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
    postLiker: SimpleUserWithName & { followings: Follow[] };
  })[];
}
/** 2023/04/25 - 게시글 좋아요 누른 사람들 요청 핸들러 - by 1-blue */
export interface ApiFetchPostLikersHandler {
  (body: ApiFetchPostLikersRequest): Promise<ApiFetchPostLikersResponse>;
}

// ============================== 댓글 좋아요 누른 사람들 요청 ==============================
/** 2023/04/27 - 댓글 좋아요 누른 사람들 요청 송신 타입 - by 1-blue */
export interface ApiFetchCommentLikersRequest {
  commentIdx: number;
  take: number;
  lastIdx: number;
}
/** 2023/04/27 - 댓글 좋아요 누른 사람들 요청 수신 타입 - by 1-blue */
export interface ApiFetchCommentLikersResponse extends ApiResponse {
  likers: (CommentLikes & {
    commentLiker: SimpleUserWithName & { followings: Follow[] };
  })[];
}
/** 2023/04/27 - 댓글 좋아요 누른 사람들 요청 핸들러 - by 1-blue */
export interface ApiFetchCommentLikersHandler {
  (body: ApiFetchCommentLikersRequest): Promise<ApiFetchCommentLikersResponse>;
}
