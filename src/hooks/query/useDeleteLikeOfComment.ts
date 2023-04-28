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
  ApiDeleteLikeOfCommentRequest,
  ApiDeleteLikeOfCommentResponse,
  ApiFetchCommentsResponse,
} from "@src/types/api";

/** 2023/04/27 - 댓글에 좋아요 제거 훅 ( 서버 ) - by 1-blue */
const useDeleteLikeOfComment = (): UseMutateFunction<
  ApiDeleteLikeOfCommentResponse,
  unknown,
  ApiDeleteLikeOfCommentRequest,
  unknown
> => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceLike.apiDeleteLikeOfComment, {
    onSuccess(data, { postIdx, commentIdx }, context) {
      queryClient.setQueryData<
        InfiniteData<ApiFetchCommentsResponse> | undefined
      >(
        [queryKeys.comments, postIdx],
        (prev) =>
          prev && {
            ...prev,
            pages: prev.pages.map((page) => ({
              ...page,
              comments:
                page.comments &&
                page.comments.map((comment) => {
                  if (comment.idx !== commentIdx) return comment;

                  return {
                    ...comment,
                    commentLikers: comment.commentLikers.filter(
                      (commentLiker) =>
                        commentLiker.commentLikerIdx !== data.commentLikerIdx
                    ),
                    _count: {
                      ...comment._count,
                      commentLikers: comment._count.commentLikers - 1,
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

export default useDeleteLikeOfComment;
