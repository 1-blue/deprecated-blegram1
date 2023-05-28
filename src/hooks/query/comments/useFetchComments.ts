import { useInfiniteQuery } from "react-query";

// api
import { apiServiceComments } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type {
  ApiFetchCommentsRequest,
  ApiFetchCommentsResponse,
} from "@src/types/api";
interface Props extends ApiFetchCommentsRequest {}

/** 2023/04/19 - 댓글들을 얻는 훅 - by 1-blue */
const useFetchComments = ({ postIdx, take, lastIdx = -1 }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<ApiFetchCommentsResponse>(
      [queryKeys.comments, postIdx],
      ({ pageParam = lastIdx }) =>
        apiServiceComments.apiFetchComments({
          postIdx,
          take,
          lastIdx: pageParam,
        }),
      {
        getNextPageParam: (lastPage, allPage) => {
          if (!lastPage.comments) return null;

          if (lastPage.comments.length < take) return null;
          else return lastPage.comments[lastPage.comments.length - 1].idx;
        },
      }
    );

  return { data, fetchNextPage, hasNextPage, isFetching };
};

export default useFetchComments;
