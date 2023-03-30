import type { ApiResponse } from ".";
import type { User } from "@prisma/client";
import type { ProfileUpdateForm } from "@src/types";

// ============================== 로그인한 유저 정보 가져오기 요청 ==============================
/** 2023/03/26 - 로그인한 유저 정보 가져오기 요청 송신 타입 - by 1-blue */
export interface ApiFetchMeRequest {}
/** 2023/03/26 - 로그인한 유저 정보 가져오기 요청 수신 타입 - by 1-blue */
export interface ApiFetchMeResponse
  extends ApiResponse<{ user: Omit<User, "password"> }> {}
/** 2023/03/26 - 로그인한 유저 정보 가져오기 요청 핸들러 - by 1-blue */
export interface ApiFetchMeHandler {
  (): Promise<ApiFetchMeResponse>;
}

// ============================== 로그인한 유저 정보 수정 ==============================
/** 2023/03/30 - 로그인한 유저 정보 수정 요청 송신 타입 - by 1-blue */
export interface ApiUpdateMeRequest extends ProfileUpdateForm {}
/** 2023/03/30 - 로그인한 유저 정보 수정 요청 수신 타입 - by 1-blue */
export interface ApiUpdateMeResponse extends ApiResponse {}
/** 2023/03/30 - 로그인한 유저 정보 수정 요청 핸들러 - by 1-blue */
export interface ApiUpdateMeHandler {
  (body: ApiUpdateMeRequest): Promise<ApiUpdateMeResponse>;
}
