import { useInfiniteQuery } from "react-query";

// api
import { apiServicePosts } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type {
  ApiFetchWrittenPostsRequest,
  ApiFetchWrittenPostsResponse,
} from "@src/types/api";
interface Props extends ApiFetchWrittenPostsRequest {
  initialData?: ApiFetchWrittenPostsResponse;
}

/** 2023/05/26 - 특정 유저가 작성한 게시글들을 얻는 훅 - by 1-blue */
const useFetchWrittenPosts = ({
  take,
  lastIdx = -1,
  nickname,
  initialData,
}: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<ApiFetchWrittenPostsResponse>(
      [queryKeys.posts, "written"],
      ({ pageParam = lastIdx }) =>
        apiServicePosts.apiFetchWrittenPosts({
          take,
          lastIdx: pageParam,
          nickname,
        }),
      {
        getNextPageParam: (lastPage, allPage) =>
          lastPage.posts?.length === take
            ? lastPage.posts[lastPage.posts.length - 1].idx
            : null,
        // ssr
        ...(initialData && {
          initialData: { pageParams: [], pages: [initialData] },
        }),
      }
    );

  return { data, fetchNextPage, hasNextPage, isFetching };
};

export default useFetchWrittenPosts;
