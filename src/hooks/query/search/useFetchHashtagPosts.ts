import { useInfiniteQuery } from "react-query";

// api
import { apiServiceSearch } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type { ApiFetchHashtagPostsResponse } from "@src/types/api";

interface Props {
  hashtag: string;
  take: number;
  initialData?: ApiFetchHashtagPostsResponse;
}

/** 2023/05/06 - 특정 해시태그를 갖는 게시글들을 얻는 훅 - by 1-blue */
const useFetchHashtagPosts = ({ hashtag, take, initialData }: Props) => {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery<ApiFetchHashtagPostsResponse>(
      [queryKeys.hashtag, hashtag],
      ({ pageParam = 0 }) =>
        apiServiceSearch.apiFetchHashtagPosts({
          take,
          skip: pageParam,
          hashtag,
        }),
      {
        getNextPageParam: (lastPage, allPage) =>
          lastPage.posts?.length === take
            ? allPage
                .map((page) => page.posts.length)
                .reduce((prev, curr) => prev + curr, 0)
            : null,
        // ssr
        ...(initialData && {
          initialData: { pageParams: [], pages: [initialData] },
        }),
      }
    );

  return { data, hasNextPage, fetchNextPage, isFetching };
};

export default useFetchHashtagPosts;
