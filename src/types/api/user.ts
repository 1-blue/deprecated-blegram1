import type { ApiResponse } from ".";
import type { User } from "@prisma/client";

// ============================== 특정 유저 정보 ==============================

/** 2023/03/29 - 특정 유저 정보 요청 송신 타입 - by 1-blue */
export interface ApiFetchUserRequest {
  nickname: string;
}

/** 2023/03/29 - 특정 유저 정보 요청 수신 타입 - by 1-blue */
export interface ApiFetchUserResponse
  extends ApiResponse<{
    user?: Pick<User, "idx" | "name" | "nickname" | "introduction" | "avatar">;
  }> {}

/** 2023/03/29 - 특정 유저 정보 요청 핸들러 - by 1-blue */
export interface ApiFetchUserHandler {
  (body: ApiFetchUserRequest): Promise<ApiFetchUserResponse>;
}
