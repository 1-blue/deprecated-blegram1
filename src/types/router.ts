// type
import type { IconShape } from ".";

/** 2023/03/24 - 라우팅을 위해 사용하는 타입 - by 1-blue */
export interface RouterElement {
  path: __next_route_internal_types__.RouteImpl<unknown>;
  label: string;
  icon: IconShape;
  withAuth?: boolean;
}

/** 2023/03/24 - 네비게이션 바에 사용하는 라우터 타입을 얻는 핸들러 - by 1-blue */
export interface GetNavRouterHandler {
  (name?: string): RouterElement[];
}
