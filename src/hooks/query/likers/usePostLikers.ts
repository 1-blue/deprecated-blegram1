import { useInfiniteQuery } from "react-query";

// api
import { apiServiceLikers } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type {
  ApiFetchPostLikersRequest,
  ApiFetchPostLikersResponse,
} from "@src/types/api";
interface Props extends ApiFetchPostLikersRequest {}

/** 2023/04/25 - 게시글에 좋아요를 누른 유저들을 얻는 훅 - by 1-blue */
const usePostLikers = ({ postIdx, take, lastIdx = -1 }: Props) => {
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery<ApiFetchPostLikersResponse>(
      [queryKeys.postLikers, postIdx],
      ({ pageParam = lastIdx }) =>
        apiServiceLikers.apiFetchPostLikers({
          take,
          lastIdx: pageParam,
          postIdx,
        }),
      {
        getNextPageParam: (lastPage, allPage) =>
          lastPage.likers?.length === take
            ? lastPage.likers[lastPage.likers.length - 1].postLikerIdx
            : null,
      }
    );

  return { data, fetchNextPage, hasNextPage, isLoading };
};

export default usePostLikers;
