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
  ApiDeleteLikeOfPostRequest,
  ApiDeleteLikeOfPostResponse,
  ApiFetchPostsResponse,
} from "@src/types/api";

/** 2023/04/24 - 게시글에 좋아요 추가 훅 ( 서버 ) - by 1-blue */
const useDeleteLikeOfPost = (): UseMutateFunction<
  ApiDeleteLikeOfPostResponse,
  unknown,
  ApiDeleteLikeOfPostRequest,
  unknown
> => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceLike.apiDeleteLikeOfPost, {
    onSuccess(data, { postIdx }, context) {
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
                    postLikers: post.postLikers.filter(
                      (post) => post.postLikerIdx !== data.postLikerIdx
                    ),
                    _count: {
                      ...post._count,
                      postLikers: post._count.postLikers - 1,
                    },
                  };
                }),
            })),
          }
      );

      toast.success(data.message);

      router.replace("/");
    },
  });

  return mutate;
};

export default useDeleteLikeOfPost;
