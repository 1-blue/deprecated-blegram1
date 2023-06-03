import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

// api
import { apiServiceComment } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type { UseMutateFunction, InfiniteData } from "react-query";
import type {
  ApiDeleteCommentRequest,
  ApiDeleteCommentResponse,
  ApiFetchCommentsResponse,
} from "@src/types/api";

/** 2023/04/21 - 댓글 제거 훅 ( 서버 ) - by 1-blue */
const useDeleteComment = (
  postIdx: number
): UseMutateFunction<
  ApiDeleteCommentResponse,
  unknown,
  ApiDeleteCommentRequest,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceComment.apiDeleteComment, {
    onSuccess(data, { commentIdx }, context) {
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
                page.comments.filter((comment) => comment.idx !== commentIdx),
            })),
          }
      );

      toast.success(data.message);
    },
  });

  return mutate;
};

export default useDeleteComment;
