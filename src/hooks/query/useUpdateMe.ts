import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

// api
import { apiServiceMe } from "@src/apis";

// key
import { queryKeys } from ".";

// type
import type { UseMutateFunction } from "react-query";
import type { ApiUpdateMeRequest, ApiUpdateMeResponse } from "@src/types/api";

/** 2023/03/30 - 로그인한 유저 정보 수정 훅 - by 1-blue */
const useUpdateMe = (): UseMutateFunction<
  ApiUpdateMeResponse,
  unknown,
  ApiUpdateMeRequest,
  unknown
> => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceMe.apiUpdateMe, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries([queryKeys.user, variables.nickname]);
      queryClient.invalidateQueries([queryKeys.user, "me"]);

      toast.success(data.message);

      router.back();
    },
  });

  return mutate;
};

export default useUpdateMe;
