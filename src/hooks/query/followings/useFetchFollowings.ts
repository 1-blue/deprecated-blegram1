import { useInfiniteQuery } from "react-query";

// api
import { apiServiceFollowings } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type {
  ApiFetchFollowingsRequest,
  ApiFetchFollowingsResponse,
} from "@src/types/api";

interface Props extends ApiFetchFollowingsRequest {}

/** 2023/05/12 - 특정 유저의 팔로잉들을 얻는 훅 - by 1-blue */
const useFetchFollowings = ({ take, lastIdx = -1, followingIdx }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery<ApiFetchFollowingsResponse>(
      [queryKeys.followings, followingIdx],
      ({ pageParam = lastIdx }) =>
        apiServiceFollowings.apiFetchFollowings({
          take,
          lastIdx: pageParam,
          followingIdx,
        }),
      {
        getNextPageParam: (lastPage, allPage) =>
          lastPage.followings?.length === take
            ? lastPage.followings[lastPage.followings.length - 1].idx
            : null,
      }
    );

  return { data, fetchNextPage, hasNextPage, isFetching, isLoading };
};

export default useFetchFollowings;
