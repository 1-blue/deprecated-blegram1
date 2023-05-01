import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

// api
import { apiServiceComment } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type { UseMutateFunction, InfiniteData } from "react-query";
import type {
  ApiFetchCommentsResponse,
  ApiUploadCommentRequest,
  ApiUploadCommentResponse,
} from "@src/types/api";

/** 2023/04/18 - 댓글 생성 - by 1-blue */
const useUploadComment = (): UseMutateFunction<
  ApiUploadCommentResponse,
  unknown,
  ApiUploadCommentRequest,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceComment.apiUploadComment, {
    onSuccess(data, { postIdx }, context) {
      queryClient.setQueryData<
        InfiniteData<ApiFetchCommentsResponse> | undefined
      >([queryKeys.comments, postIdx], (prev) => ({
        pageParams: [],
        ...prev,
        pages: prev!.pages.map((page, index) => {
          if (index !== prev!.pages.length - 1) return page;

          return {
            ...page,
            comments: [...page.comments!, data.createdComment],
          };
        }),
      }));

      toast.success(data.message);
    },
  });

  return mutate;
};

export default useUploadComment;
