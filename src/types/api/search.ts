import type { Hashtag } from "@prisma/client";
import type { ApiResponse, PostWithData, SimpleUserWithName } from ".";

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
