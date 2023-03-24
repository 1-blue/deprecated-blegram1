import type { CSSProp } from "styled-components";
import type { Theme } from "@src/shared/theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
