import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

// api
import { apiServiceFollow } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type { InfiniteData, UseMutateFunction } from "react-query";
import type {
  ApiCreateFollowRequest,
  ApiCreateFollowResponse,
  ApiFetchPostsResponse,
} from "@src/types/api";

/** 2023/05/09 - 팔로우 요청 훅 - by 1-blue */
const useCreateFollow = (): UseMutateFunction<
  ApiCreateFollowResponse,
  unknown,
  ApiCreateFollowRequest,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceFollow.apiCreateFollow, {
    onSuccess(
      { followerIdx, followingIdx, message },
      { userIdx, postIdx },
      context
    ) {
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
                    followings: [{ followerIdx, followingIdx }],
                  },
                };
              }),
            })),
          }
      );

      toast.success(message);
    },
  });

  return mutate;
};

export default useCreateFollow;
