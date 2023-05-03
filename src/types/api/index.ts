import type { User } from "@prisma/client";

/** 2023/03/26 - API 응답 타입 - by 1-blue */
export type ApiResponse<T = unknown> = { message: string } & T;

/** 2023/04/08 - 간단한 유저 타입 - by 1-blue */
export type SimpleUser = Pick<User, "idx" | "avatar" | "nickname">;

/** 2023/04/28 - 간단한 유저 타입 + name - by 1-blue */
export type SimpleUserWithName = Pick<
  User,
  "idx" | "avatar" | "name" | "nickname"
>;

export * from "./auth";
export * from "./me";
export * from "./user";
export * from "./photo";
export * from "./aws";
export * from "./post";
export * from "./posts";
export * from "./comment";
export * from "./comments";
export * from "./like";
export * from "./likers";
export * from "./bookmark";
