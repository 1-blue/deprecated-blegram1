import useDeleteComment from "./useDeleteComment";
import useUpdateComment from "./useUpdateComment";
import useUploadComment from "./useUploadComment";

/** 2023/05/01 - 댓글 관련 훅들 - by 1-blue */
export const useComment = {
  /** 2023/04/21 - 댓글 제거 훅 - by 1-blue */
  useDeleteComment,
  /** 2023/04/21 - 댓글 수정 훅 - by 1-blue */
  useUpdateComment,
  /** 2023/04/18 - 댓글 생성 훅 - by 1-blue */
  useUploadComment,
};
