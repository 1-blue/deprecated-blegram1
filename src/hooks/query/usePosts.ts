import { useQuery } from "react-query";

// api
import { apiServicePosts } from "@src/apis";

// key
import { queryKeys } from ".";

// type
import type { ApiFetchPostsResponse } from "@src/types/api";

interface UsePostsHandler {
  (body: { take: number; lastIdx: number }): {
    posts: ApiFetchPostsResponse["posts"];
    isFetchingPosts: boolean;
  };
}

/** 2023/04/08 - 게시글들을 얻는 훅 - by 1-blue */
const usePosts: UsePostsHandler = ({ take, lastIdx }) => {
  const { data, isLoading } = useQuery<ApiFetchPostsResponse>(
    [queryKeys.post, lastIdx],
    () => apiServicePosts.apiFetchPosts({ take, lastIdx })
  );

  return { posts: data?.posts, isFetchingPosts: isLoading };
};

export default usePosts;
