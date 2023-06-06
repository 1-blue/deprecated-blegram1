import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

// api
import { apiServiceLike } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type { UseMutateFunction, InfiniteData } from "react-query";
import type {
  ApiFetchCommentsResponse,
  ApiUploadLikeOfCommentRequest,
  ApiUploadLikeOfCommentResponse,
} from "@src/types/api";

/** 2023/04/27 - 댓글에 좋아요 추가 훅 - by 1-blue */
const useUploadLikeOfComment = (): UseMutateFunction<
  ApiUploadLikeOfCommentResponse,
  unknown,
  ApiUploadLikeOfCommentRequest,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceLike.apiUploadLikeOfComment, {
    onSuccess({ message, commentLikerIdx }, { postIdx, commentIdx }, context) {
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
                    commentLikers: [
                      ...comment.commentLikers,
                      {
                        commentLikerIdx,
                        commentLikedIdx: commentIdx,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                      },
                    ],
                    _count: {
                      ...comment._count,
                      commentLikers: comment._count.commentLikers + 1,
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

export default useUploadLikeOfComment;
