import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

// api
import { apiServiceLike } from "@src/apis";

// key
import { queryKeys } from ".";

// type
import type { UseMutateFunction, InfiniteData } from "react-query";
import type {
  ApiFetchMeResponse,
  ApiFetchPostsResponse,
  ApiUploadLikeOfPostRequest,
  ApiUploadLikeOfPostResponse,
} from "@src/types/api";

/** 2023/04/24 - 게시글에 좋아요 추가 훅 ( 서버 ) - by 1-blue */
const useUploadLikeOfPost = (): UseMutateFunction<
  ApiUploadLikeOfPostResponse,
  unknown,
  ApiUploadLikeOfPostRequest,
  unknown
> => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceLike.apiUploadLikeOfPost, {
    onSuccess({ message, postLikerIdx }, { postIdx }, context) {
      queryClient.setQueryData<InfiniteData<ApiFetchPostsResponse> | undefined>(
        [queryKeys.post],
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
                      { postLikerIdx, postLikedIdx: postIdx },
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

      toast.success(message);

      router.replace("/");
    },
  });

  return mutate;
};

export default useUploadLikeOfPost;
