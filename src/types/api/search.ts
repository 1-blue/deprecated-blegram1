import type { Hashtag } from "@prisma/client";
import type {
  ApiResponse,
  PageInfo,
  PostWithData,
  SimpleUserWithName,
} from ".";

// ============================== 해시태그 및 유저 추천 검색어 요청 ==============================
/** 2023/05/04 - 해시태그 및 유저 추천 검색어 요청 송신 타입 - by 1-blue */
export interface ApiFetchSuggestedRequest {
  query: string;
}
/** 2023/05/04 - 해시태그 및 유저 추천 검색어 요청 수신 타입 - by 1-blue */
export interface ApiFetchSuggestedResponse extends ApiResponse {
  hashtags: Hashtag[];
  users: SimpleUserWithName[];
}
/** 2023/05/04 - 해시태그 및 유저 추천 검색어 요청 핸들러 - by 1-blue */
export interface ApiFetchSuggestedHandler {
  (body: ApiFetchSuggestedRequest): Promise<ApiFetchSuggestedResponse>;
}

// ============================== 해시태그를 갖는 게시글들 요청 ==============================
/** 2023/05/05 - 해시태그 및 유저 추천 검색어 요청 송신 타입 - by 1-blue */
export interface ApiFetchHashtagPostsRequest {
  hashtag: string;
  take: number;
  skip?: number;
}
/** 2023/05/05 - 해시태그 및 유저 추천 검색어 요청 수신 타입 - by 1-blue */
export interface ApiFetchHashtagPostsResponse extends ApiResponse {
  posts: PostWithData[];
}
/** 2023/05/05 - 해시태그 및 유저 추천 검색어 요청 핸들러 - by 1-blue */
export interface ApiFetchHashtagPostsHandler {
  (body: ApiFetchHashtagPostsRequest): Promise<ApiFetchHashtagPostsResponse>;
}
