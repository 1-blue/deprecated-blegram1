import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

// api
import { apiServiceAuth } from "@src/apis";

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
  const { mutate, isSuccess } = useMutation(apiServiceAuth.apiLogOut);

  /** 2023/03/31 - 로그아웃 성공 시 로그인 페이지로 리다이렉트 - by 1-blue */
  useEffect(
    () => void (isSuccess && router.replace("/login")),
    [isSuccess, router]
  );

  return mutate;
};

export default useLogOut;
