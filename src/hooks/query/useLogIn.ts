import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

// api
import { apiServiceAuth } from "@src/apis";

// type
import type { UseMutateFunction } from "react-query";
import type { ApiLogInRequest, ApiLogInResponse } from "@src/types/api";

/** 2023/03/30 - 로그인 요청 훅 - by 1-blue */
const useLogIn = (): UseMutateFunction<
  ApiLogInResponse,
  unknown,
  ApiLogInRequest,
  unknown
> => {
  const router = useRouter();
  const { mutate, isSuccess } = useMutation(apiServiceAuth.apiLogIn);

  /** 2023/03/30 - 로그인 성공 시 메인 페이지로 리다이렉트 - by 1-blue */
  useEffect(() => void (isSuccess && router.replace("/")), [isSuccess, router]);

  return mutate;
};

export default useLogIn;
