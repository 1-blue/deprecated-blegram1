import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

// api
import { apiServiceFollow } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type { InfiniteData, UseMutateFunction } from "react-query";
import type {
  ApiDeleteFollowRequest,
  ApiDeleteFollowResponse,
  ApiFetchPostsResponse,
} from "@src/types/api";

/** 2023/05/09 - 언팔로우 요청 훅 - by 1-blue */
const useDeleteFollow = (): UseMutateFunction<
  ApiDeleteFollowResponse,
  unknown,
  ApiDeleteFollowRequest,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceFollow.apiDeleteFollow, {
    onSuccess(data, { userIdx, postIdx }, context) {
      queryClient.setQueryData<InfiniteData<ApiFetchPostsResponse> | undefined>(
        [queryKeys.posts],
        (prev) =>
          prev && {
            ...prev,
            pages: prev.pages.map((page) => ({
              ...page,
              posts: page.posts?.map((post) => {
                if (post.userIdx !== userIdx) return post;

                return {
                  ...post,
                  user: {
                    ...post.user,
                    followings: [],
                  },
                };
              }),
            })),
          }
      );

      toast.success(data.message);
    },
  });

  return mutate;
};

export default useDeleteFollow;
