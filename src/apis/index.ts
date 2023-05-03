import axios from "axios";

/** 2023/03/25 - 백엔드에 API 요청하는 axios 인스턴스 - by 1-blue */
export const serverInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 4000,
});

/** 2023/04/30 - SSR에 사용하는 axios 인스턴스 - by 1-blue */
export const ssrInstance = axios.create({
  baseURL: process.env.BASE_URL + "/api",
  withCredentials: true,
  timeout: 1000,
  headers: { "Cache-Control": "no-cache" },
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
