/** 2023/03/26 - API 응답 타입 - by 1-blue */
export type ApiResponse<T = unknown> = { message: string } & T;

export * from "./auth";