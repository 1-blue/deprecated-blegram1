import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

// api
import { apiServiceAuth } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type { UseMutateFunction } from "react-query";
import type { ApiLogOutRequest, ApiLogOutResponse } from "@src/types/api";

/** 2023/03/31 - 로그아웃 요청 훅 - by 1-blue */
const useLogOut = (): UseMutateFunction<
  ApiLogOutResponse,
  unknown,
  ApiLogOutRequest,
  unknown
> => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceAuth.apiLogOut, {
    /** 2023/04/03 - 로그아웃 성공 시 캐시 초기화 및 로그인 페이지로 리다이렉트 - by 1-blue */
    onSuccess(data, variables, context) {
      queryClient.resetQueries([queryKeys.user, "me"]);

      toast.success(data.message);

      router.replace("/login");
    },
  });

  return mutate;
};

export default useLogOut;
