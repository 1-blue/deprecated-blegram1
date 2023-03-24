// type
import type { Size } from "@src/types";

type TableOfSize = {
  [index in Size]: number;
};

/** 2023/03/23 - 사이즈 테이블 ( 최대/최소 사이즈 결정에 사용 ) - by 1-blue */
export const tableOfSize: TableOfSize = {
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  "2xl": 5,
};
