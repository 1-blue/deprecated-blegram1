import { serverInstance } from ".";

// type
import type {
  ApiFetchMeHandler,
  ApiLogInHandler,
  ApiSignUpHandler,
} from "@src/types/api/auth";

/** 2023/03/15 - 회원가입 요청 - by 1-blue */
const apiSignUp: ApiSignUpHandler = async (body) => {
  const { data } = await serverInstance.post("/signup", body);

  return data;
};

/** 2023/03/15 - 로그인 요청 - by 1-blue */
const apiLogIn: ApiLogInHandler = async (body: any) => {
  const { data } = await serverInstance.post("/login", body);

  return data;
};

/** 2023/03/16 - 로그인한 유저 정보 요청 - by 1-blue */
const apiFetchMe: ApiFetchMeHandler = async () => {
  const { data } = await serverInstance.get("/me");

  return data;
};

/** 2023/03/15 - 인증 관련된 요청 - by 1-blue */
export const apiServiceAuth = {
  /** 2023/03/15 - 회원가입 요청 - by 1-blue */
  apiSignUp,
  /** 2023/03/15 - 로그인 요청 - by 1-blue */
  apiLogIn,
  /** 2023/03/16 - 로그인한 유저 정보 요청 - by 1-blue */
  apiFetchMe,
};
