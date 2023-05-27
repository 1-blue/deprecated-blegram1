import { useInfiniteQuery } from "react-query";

// api
import { apiServiceFollowers } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type {
  ApiFetchFollowersRequest,
  ApiFetchFollowersResponse,
} from "@src/types/api";

interface Props extends ApiFetchFollowersRequest {}

/** 2023/05/12 - 특정 유저의 팔로워들을 얻는 훅 - by 1-blue */
const useFetchFollowers = ({ take, lastIdx = -1, followerIdx }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<ApiFetchFollowersResponse>(
      [queryKeys.followers, followerIdx],
      ({ pageParam = lastIdx }) =>
        apiServiceFollowers.apiFetchFollowers({
          take,
          lastIdx: pageParam,
          followerIdx,
        }),
      {
        getNextPageParam: (lastPage, allPage) =>
          lastPage.followers?.length === take
            ? lastPage.followers[lastPage.followers.length - 1].idx
            : null,
      }
    );

  return { data, fetchNextPage, hasNextPage, isFetching };
};

export default useFetchFollowers;
