export * from "./router";
export * from "./auth";
export * from "./aws";

/** 2023/03/23 - 크기 - by 1-blue */
export type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/** 2023/03/23 - 아이콘 형태 - by 1-blue */
export type IconShape =
  | "search"
  | "sun"
  | "moon"
  | "home"
  | "cog-6-tooth"
  | "chat-bubble-bottom-center-text"
  | "bell"
  | "plus-circle"
  | "arrow-right-on-rectangle"
  | "user"
  | "plus"
  | "arrow-path"
  | "chevron-double-down"
  | "photo"
  | "ellipsis-vertical"
  | "heart"
  | "bookmark"
  | "chat-bubble-oval-left"
  | "trash"
  | "link"
  | "pencil"
  | "exclamation-circle"
  | "square-2-stack";

/** 2023/05/26 - 프로필 페이지 타입 ( 어떤 종류의 게시글들을 보여줄지 ) - by 1-blue */
export type ProfilePageType = "written" | "bookmarked" | "liked";
