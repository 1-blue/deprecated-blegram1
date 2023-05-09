import useCreateFollow from "./useCreateFollow";
import useDeleteFollow from "./useDeleteFollow";

/** 2023/05/09 - 좋아요 관련 훅들 - by 1-blue */
export const useFollow = {
  /** 2023/05/09 - 팔로우 요청 훅 - by 1-blue */
  useCreateFollow,
  /** 2023/05/09 - 언팔로우 요청 훅 - by 1-blue */
  useDeleteFollow,
};
