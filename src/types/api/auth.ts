import type { ApiResponse } from ".";
import type { User } from "@prisma/client";
import type { LogInForm, SignUpForm } from "@src/types";

// ============================== 회원가입 ==============================
/** 2023/03/26 - 회원가입 요청 송신 타입 - by 1-blue */
export interface ApiSignUpRequest extends Omit<SignUpForm, "passwordCheck"> {}
/** 2023/03/26 - 회원가입 요청 수신 타입 - by 1-blue */
export interface ApiSignUpResponse extends ApiResponse {}
/** 2023/03/26 - 회원가입 요청 핸들러 - by 1-blue */
export interface ApiSignUpHandler {
  (body: ApiSignUpRequest): Promise<ApiSignUpResponse>;
}

// ============================== 로그인 ==============================
/** 2023/03/26 - 로그인 요청 송신 타입 - by 1-blue */
export interface ApiLogInRequest extends LogInForm {}
/** 2023/03/26 - 로그인 요청 수신 타입 - by 1-blue */
export interface ApiLogInResponse extends ApiResponse {}
/** 2023/03/26 - 로그인 요청 핸들러 - by 1-blue */
export interface ApiLogInHandler {
  (body: ApiLogInRequest): Promise<ApiLogInResponse>;
}

// ============================== 로그인한 유저 정보 ==============================
/** 2023/03/26 - 로그인한 유저 정보 요청 송신 타입 - by 1-blue */
export interface ApiFetchMeRequest {}
/** 2023/03/26 - 로그인한 유저 정보 요청 수신 타입 - by 1-blue */
export interface ApiFetchMeResponse
  extends ApiResponse<{ user: Omit<User, "password"> }> {}
/** 2023/03/26 - 로그인한 유저 정보 요청 핸들러 - by 1-blue */
export interface ApiFetchMeHandler {
  (): Promise<ApiFetchMeResponse>;
}
