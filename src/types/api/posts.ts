import type { ApiResponse, SimpleUser } from ".";
import type { Comment, Post } from "@prisma/client";

/** 2023/04/19 - 응답받을 게시글의 타입 - by 1-blue */
interface PostWithData extends Post {
  user: SimpleUser;
  comments: Comment[];
  postLiker: { postLiker: SimpleUser }[];
  _count: {
    comments: number;
    postLiker: number;
    bookMarker: number;
  };
}

// ============================== 게시글들 가져오기 요청 ==============================
/** 2023/04/08 - 게시글들 가져오기 요청 송신 타입 - by 1-blue */
export interface ApiFetchPostsRequest {
  take: number;
  lastIdx: number;
}
/** 2023/04/08 - 게시글들 가져오기 요청 수신 타입 - by 1-blue */
export interface ApiFetchPostsResponse extends ApiResponse {
  posts?: PostWithData[];
}
/** 2023/04/08 - 게시글들 가져오기 요청 핸들러 - by 1-blue */
export interface ApiFetchPostsHandler {
  (body: ApiFetchPostsRequest): Promise<ApiFetchPostsResponse>;
}
