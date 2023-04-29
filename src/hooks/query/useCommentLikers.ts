import { useInfiniteQuery } from "react-query";

// api
import { apiServiceLikers } from "@src/apis";

// key
import { queryKeys } from ".";

// type
import type { ApiFetchCommentLikersResponse } from "@src/types/api";
interface Props {
  commentIdx: number;
  take: number;
  lastIdx?: number;
}

/** 2023/04/28 - 댓글에 좋아요를 누른 유저들을 얻는 훅 - by 1-blue ( 2023/04/10 ) */
const usePostLikers = ({ commentIdx, take, lastIdx = -1 }: Props) => {
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery<ApiFetchCommentLikersResponse>(
      [queryKeys.commentLikers, commentIdx],
      ({ pageParam = lastIdx }) =>
        apiServiceLikers.apiFetchCommentLikers({
          take,
          lastIdx: pageParam,
          commentIdx,
        }),
      {
        getNextPageParam: (lastPage, allPage) =>
          lastPage.likers?.length === take
            ? lastPage.likers[lastPage.likers.length - 1].commentLikerIdx
            : null,
      }
    );

  return { data, fetchNextPage, hasNextPage, isLoading };
};

export default usePostLikers;
