// type
import type { GetNavRouterHandler, RouterElement } from "@src/types";

/** 2023/03/24 - 네비게이션 라우팅에 사용하는 변수 ( 기본 ) - by 1-blue */
const navRouter: RouterElement[] = [
  { path: "/", label: "메인", icon: "home", withAuth: false },
  {
    path: "/search",
    label: "검색",
    icon: "search",
    withAuth: false,
  },
  {
    path: "/upload",
    label: "생성",
    icon: "plus-circle",
    withAuth: false,
  },
  {
    path: "/notification",
    label: "알림",
    icon: "bell",
    withAuth: false,
  },
];

/** 2023/03/27 - 로그인 여부에 따라 다른 네비게이션 바를 리턴하는 함수 - by 1-blue */
export const getNavRouter: GetNavRouterHandler = (nickname) => {
  const myNavRouter = [...navRouter];

  // 로그인한 경우
  if (nickname) {
    myNavRouter.push({
      path: "/" + nickname,
      label: "내 정보",
      icon: "user",
      withAuth: false,
    });
  }
  // 로그인 안 한 경우
  else {
    myNavRouter.push({
      path: "/login",
      label: "로그인",
      icon: "arrow-right-on-rectangle",
      withAuth: false,
    });
  }

  return myNavRouter;
};
