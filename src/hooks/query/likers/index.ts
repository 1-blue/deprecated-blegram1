import useCommentLikers from "./useCommentLikers";
import usePostLikers from "./usePostLikers";

/** 2023/05/01 - 좋아요를 누른 사람들 관련 훅들 - by 1-blue */
export const useLikers = {
  /** 2023/04/28 - 댓글에 좋아요를 누른 유저들을 얻는 훅 - by 1-blue */
  useCommentLikers,
  /** 2023/04/25 - 게시글에 좋아요를 누른 유저들을 얻는 훅 - by 1-blue */
  usePostLikers,
};
