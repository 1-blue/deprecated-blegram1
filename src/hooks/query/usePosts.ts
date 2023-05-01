import { type InfiniteData, useInfiniteQuery } from "react-query";

// api
import { apiServicePosts } from "@src/apis";

// key
import { queryKeys } from ".";

// type
import type { ApiFetchPostsResponse } from "@src/types/api";
interface Props {
  take: number;
  lastIdx?: number;
  initialData?: InfiniteData<ApiFetchPostsResponse>;
}

/** 2023/04/08 - 게시글들을 얻는 훅 - by 1-blue ( 2023/04/10 ) */
const usePosts = ({ take, lastIdx = -1, initialData }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<ApiFetchPostsResponse>(
      [queryKeys.posts],
      ({ pageParam = lastIdx }) =>
        apiServicePosts.apiFetchPosts({ take, lastIdx: pageParam }),
      {
        getNextPageParam: (lastPage, allPage) =>
          lastPage.posts?.length === take
            ? lastPage.posts[lastPage.posts.length - 1].idx
            : null,
        // ssr
        initialData,
      }
    );

  return { data, fetchNextPage, hasNextPage, isFetching };
};

export default usePosts;
