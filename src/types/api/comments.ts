import type { ApiResponse, SimpleUser } from ".";
import type { Comment } from "@prisma/client";

/** 2023/04/19 - 응답받을 댓글의 타입 - by 1-blue */
export interface CommentsWithData extends Comment {
  user: SimpleUser;
  commentLikers: { commentLiker: SimpleUser }[];
  _count: { commentLikers: number };
}

// ============================== 댓글들 가져오기 요청 ==============================
/** 2023/04/19 - 댓글들 가져오기 요청 송신 타입 - by 1-blue */
export interface ApiFetchCommentsRequest {
  postIdx: number;
  take: number;
  lastIdx: number;
}
/** 2023/04/19 - 댓글들 가져오기 요청 수신 타입 - by 1-blue */
export interface ApiFetchCommentsResponse extends ApiResponse {
  comments?: CommentsWithData[];
}
/** 2023/04/19 - 댓글들 가져오기 요청 핸들러 - by 1-blue */
export interface ApiFetchCommentsHandler {
  (body: ApiFetchCommentsRequest): Promise<ApiFetchCommentsResponse>;
}
