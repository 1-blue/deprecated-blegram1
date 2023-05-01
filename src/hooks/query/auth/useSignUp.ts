import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

// api
import { apiServiceAuth } from "@src/apis";

// type
import type { UseMutateFunction } from "react-query";
import type { ApiSignUpRequest, ApiSignUpResponse } from "@src/types/api";

/** 2023/03/30 - 회원가입 요청 훅 - by 1-blue */
const useSignUp = (): UseMutateFunction<
  ApiSignUpResponse,
  unknown,
  ApiSignUpRequest,
  unknown
> => {
  const router = useRouter();
  const { mutate, isSuccess } = useMutation(apiServiceAuth.apiSignUp);

  /** 2023/03/30 - 로그인 성공 시 메인 페이지로 리다이렉트 - by 1-blue */
  useEffect(
    () => void (isSuccess && router.replace("/login")),
    [isSuccess, router]
  );

  return mutate;
};

export default useSignUp;
