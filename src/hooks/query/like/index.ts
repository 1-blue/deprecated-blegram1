import useDeleteLikeOfComment from "./useDeleteLikeOfComment";
import useDeleteLikeOfPost from "./useDeleteLikeOfPost";
import useUploadLikeOfComment from "./useUploadLikeOfComment";
import useUploadLikeOfPost from "./useUploadLikeOfPost";

/** 2023/05/01 - 좋아요 관련 훅들 - by 1-blue */
export const useLike = {
  /** 2023/04/27 - 댓글에 좋아요 제거 훅 - by 1-blue */
  useDeleteLikeOfComment,
  /** 2023/04/24 - 게시글에 좋아요 제거 훅 - by 1-blue */
  useDeleteLikeOfPost,
  /** 2023/04/27 - 댓글에 좋아요 추가 훅 - by 1-blue */
  useUploadLikeOfComment,
  /** 2023/04/24 - 게시글에 좋아요 추가 훅 - by 1-blue */
  useUploadLikeOfPost,
};
