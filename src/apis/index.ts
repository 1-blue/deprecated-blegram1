import axios from "axios";

/** 2023/03/25 - 백엔드에 API 요청하는 axios 인스턴스 - by 1-blue */
export const serverInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 4000,
});

export * from "./auth";
export * from "./me";
export * from "./user";
export * from "./photo";
export * from "./photos";
export * from "./post";
export * from "./posts";
export * from "./comment";
export * from "./comments";
export * from "./like";
export * from "./likers";
export * from "./bookmark";
export * from "./search";
