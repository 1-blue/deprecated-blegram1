import { useMutation, useQueryClient } from "react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

// api
import { apiServiceLike } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type { UseMutateFunction, InfiniteData } from "react-query";
import type {
  ApiFetchPostResponse,
  ApiFetchPostsResponse,
  ApiUploadLikeOfPostRequest,
  ApiUploadLikeOfPostResponse,
} from "@src/types/api";

/** 2023/04/24 - 게시글에 좋아요 추가 훅 - by 1-blue */
const useUploadLikeOfPost = (): UseMutateFunction<
  ApiUploadLikeOfPostResponse,
  unknown,
  ApiUploadLikeOfPostRequest,
  unknown
> => {
  const hashtag = useSearchParams()?.get("hashtag");
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceLike.apiUploadLikeOfPost, {
    onSuccess({ message, postLikerIdx }, { postIdx }, context) {
      queryClient.setQueryData<InfiniteData<ApiFetchPostsResponse> | undefined>(
        hashtag ? [queryKeys.hashtag, hashtag] : [queryKeys.posts],
        (prev) =>
          prev && {
            ...prev,
            pages: prev.pages.map((page) => ({
              ...page,
              posts:
                page.posts &&
                page.posts.map((post) => {
                  if (post.idx !== postIdx) return post;

                  return {
                    ...post,
                    postLikers: [
                      ...post.postLikers,
                      {
                        postLikerIdx,
                        postLikedIdx: postIdx,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                      },
                    ],
                    _count: {
                      ...post._count,
                      postLikers: post._count.postLikers + 1,
                    },
                  };
                }),
            })),
          }
      );

      // 단일 포스트
      queryClient.setQueryData<ApiFetchPostResponse | undefined>(
        [queryKeys.post, postIdx],
        (prev) =>
          prev && {
            ...prev,
            post: {
              ...prev.post,
              postLikers: [
                ...prev.post.postLikers,
                {
                  postLikerIdx,
                  postLikedIdx: postIdx,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ],
              _count: {
                ...prev.post._count,
                postLikers: prev.post._count.postLikers + 1,
              },
            },
          }
      );

      toast.success(message);
    },
  });

  return mutate;
};

export default useUploadLikeOfPost;
