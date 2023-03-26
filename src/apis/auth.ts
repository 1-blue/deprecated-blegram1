import { serverInstance } from ".";

/** 2023/03/15 - 회원가입 요청 - by 1-blue */
const apiSignUp = async (body: any) => serverInstance.post("/signup", body);

/** 2023/03/15 - 로그인 요청 - by 1-blue */
const apiLogIn = async (body: any) => serverInstance.post("/login", body);

/** 2023/03/15 - 인증 관련된 요청 - by 1-blue */
export const apiServiceAuth = {
  apiSignUp,
  apiLogIn,
};
