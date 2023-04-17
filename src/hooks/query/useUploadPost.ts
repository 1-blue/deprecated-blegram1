import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

// api
import { apiServicePost } from "@src/apis";

// key
import { queryKeys } from ".";

// type
import type { UseMutateFunction } from "react-query";
import type {
  ApiUploadPostRequest,
  ApiUploadPostResponse,
} from "@src/types/api";

/** 2023/04/08 - 게시글 업로드 훅 ( 서버 ) - by 1-blue */
const useUploadPost = (): UseMutateFunction<
  ApiUploadPostResponse,
  unknown,
  ApiUploadPostRequest,
  unknown
> => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServicePost.apiUploadPost, {
    onSuccess(data, variables, context) {
      queryClient.setQueriesData(queryKeys.post, data.createdPost);

      toast.success(data.message);

      router.replace("/");
    },
  });

  return mutate;
};

export default useUploadPost;
