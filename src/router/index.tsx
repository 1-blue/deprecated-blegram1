// type
import type { NavRouter } from "@src/types";

// TODO: 로그인 여부에 따라 다르게 변경
/** 2023/03/24 네비게이션 라우팅에 사용하는 변수 - by 1-blue */
export const navRouter: NavRouter = [
  { path: "/", label: "메인", icon: "home", withAuth: false },
  {
    path: "/search",
    label: "검색",
    icon: "search",
    withAuth: false,
  },
  {
    path: "/dm",
    label: "메세지",
    icon: "chat-bubble-bottom-center-text",
    withAuth: false,
  },
  {
    path: "/notification",
    label: "알림",
    icon: "bell",
    withAuth: false,
  },
  {
    path: "/login",
    label: "로그인",
    icon: "arrow-right-on-rectangle",
    withAuth: false,
  },
];