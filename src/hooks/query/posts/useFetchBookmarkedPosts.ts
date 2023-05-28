import { useInfiniteQuery } from "react-query";

// api
import { apiServicePosts } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type {
  ApiFetchBookmarkedPostsRequest,
  ApiFetchBookmarkedPostsResponse,
} from "@src/types/api";
interface Props extends ApiFetchBookmarkedPostsRequest {
  initialData?: ApiFetchBookmarkedPostsResponse;
}

/** 2023/05/26 - 특정 유저가 북마크한 게시글들을 얻는 훅 - by 1-blue */
const useFetchBookmarkedPosts = ({
  take,
  lastIdx = -1,
  nickname,
  initialData,
}: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<ApiFetchBookmarkedPostsResponse>(
      [queryKeys.posts, "bookmarked"],
      ({ pageParam = lastIdx }) =>
        apiServicePosts.apiFetchBookmarkedPosts({
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

export default useFetchBookmarkedPosts;
