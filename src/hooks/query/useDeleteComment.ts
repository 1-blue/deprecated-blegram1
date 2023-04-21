import { type InfiniteData, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

// api
import { apiServiceComment } from "@src/apis";

// key
import { queryKeys } from ".";

// type
import type { UseMutateFunction } from "react-query";
import type {
  ApiDeleteCommentRequest,
  ApiDeleteCommentResponse,
  ApiFetchCommentsResponse,
} from "@src/types/api";

/** 2023/04/21 - 댓글 제거 훅 ( 서버 ) - by 1-blue */
const useDeleteComment = (): UseMutateFunction<
  ApiDeleteCommentResponse,
  unknown,
  ApiDeleteCommentRequest,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceComment.apiDeleteComment, {
    onSuccess(data, { idx }, context) {
      queryClient.setQueryData<
        InfiniteData<ApiFetchCommentsResponse> | undefined
      >(queryKeys.comment, (prev) => ({
        pageParams: [],
        ...prev,
        pages: prev!.pages.map((page) => ({
          ...page,
          comments: page.comments!.filter((comment) => comment.idx !== idx),
        })),
      }));

      toast.success(data.message);
    },
  });

  return mutate;
};

export default useDeleteComment;
