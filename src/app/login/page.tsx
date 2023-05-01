import LogIn from "@src/components/pages/LogIn";

// ssr
import { defaultMatadata } from "@src/shared/metadata";
import type { Metadata } from "next";

/** 2023/04/30 - 메타데이터 - by 1-blue */
export const metadata: Metadata = {
  ...defaultMatadata,

  title: "blegram | 로그인",
  description: "로그인 페이지입니다.",
};

/** 2023/03/24 - 로그인 페이지 - by 1-blue */
const LogInPage = () => <LogIn />;

export default LogInPage;
