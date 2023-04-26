import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

// api
import { apiServiceComment } from "@src/apis";

// key
import { queryKeys } from ".";

// type
import type { UseMutateFunction, InfiniteData } from "react-query";
import type {
  ApiUpdateCommentRequest,
  ApiUpdateCommentResponse,
  ApiFetchCommentsResponse,
} from "@src/types/api";

/** 2023/04/21 - 댓글 수정 훅 ( 서버 ) - by 1-blue */
const useUpdateComment = (
  postIdx: number
): UseMutateFunction<
  ApiUpdateCommentResponse,
  unknown,
  ApiUpdateCommentRequest,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceComment.apiUpdateComment, {
    onSuccess(data, { idx, content }, context) {
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
                page.comments.map((comment) =>
                  comment.idx === idx ? { ...comment, content } : comment
                ),
            })),
          }
      );

      toast.success(data.message);
    },
  });

  return mutate;
};

export default useUpdateComment;
