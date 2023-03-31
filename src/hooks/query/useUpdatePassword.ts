import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

// api
import { apiServiceMe } from "@src/apis";

// key
import { queryKeys } from ".";

// type
import type { UseMutateFunction } from "react-query";
import type {
  ApiUpdatePasswordRequest,
  ApiUpdatePasswordResponse,
} from "@src/types/api";

/** 2023/03/31 - 로그인한 유저 비밀번호 수정 훅 - by 1-blue */
const useUpdatePassword = (): UseMutateFunction<
  ApiUpdatePasswordResponse,
  unknown,
  ApiUpdatePasswordRequest,
  unknown
> => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceMe.apiUpdatePassword, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries([queryKeys.user]);

      toast.success(data.message);

      router.replace("/login");
    },
  });

  return mutate;
};

export default useUpdatePassword;
