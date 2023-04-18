import { useMutation } from "react-query";
import { toast } from "react-toastify";

// api
import { apiServiceComment } from "@src/apis";

// type
import type { UseMutateFunction } from "react-query";
import type {
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
  const { mutate } = useMutation(apiServiceComment.apiUploadComment, {
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
  });

  return mutate;
};

export default useUploadComment;
