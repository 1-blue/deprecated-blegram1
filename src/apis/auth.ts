import { serverInstance } from ".";

// type
import type {
  ApiLogInHandler,
  ApiLogInResponse,
  ApiLogOutHandler,
  ApiLogOutResponse,
  ApiSignUpHandler,
  ApiSignUpResponse,
} from "@src/types/api";

/** 2023/03/25 - 회원가입 요청 - by 1-blue */
const apiSignUp: ApiSignUpHandler = async (body) => {
  const { data } = await serverInstance.post<ApiSignUpResponse>(
    "/signup",
    body
  );

  return data;
};

/** 2023/03/25 - 로그인 요청 - by 1-blue */
const apiLogIn: ApiLogInHandler = async (body) => {
  const { data } = await serverInstance.post<ApiLogInResponse>("/login", body);

  return data;
};

/** 2023/03/31 - 로그아웃 요청 - by 1-blue */
const apiLogOut: ApiLogOutHandler = async (body) => {
  const { data } = await serverInstance.post<ApiLogOutResponse>(
    "/logout",
    body
  );

  return data;
};

/** 2023/03/25 - 인증 관련된 요청 - by 1-blue */
export const apiServiceAuth = {
  /** 2023/03/25 - 회원가입 요청 - by 1-blue */
  apiSignUp,
  /** 2023/03/25 - 로그인 요청 - by 1-blue */
  apiLogIn,
  /** 2023/03/25 - 로그아웃 요청 - by 1-blue */
  apiLogOut,
};
