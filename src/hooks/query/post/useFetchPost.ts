import { useQuery } from "react-query";

// api
import { apiServicePost } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type { ApiFetchPostRequest, ApiFetchPostResponse } from "@src/types/api";

interface Props extends ApiFetchPostRequest {}

/** 2023/06/02 - 게시글 가져오기 훅 - by 1-blue */
const useFetchPost = ({ postIdx }: Props) => {
  const { data, isLoading } = useQuery<ApiFetchPostResponse>(
    [queryKeys.post, postIdx],
    () => apiServicePost.apiFetchPost({ postIdx }),
    { onSuccess() {}, retry: 0 }
  );

  console.log(data);

  return { post: data?.post, isLoading };
};

export default useFetchPost;
