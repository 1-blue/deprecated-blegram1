import SignUp from "@src/components/pages/SignUp";

// ssr
import { defaultMatadata } from "@src/shared/metadata";
import type { Metadata } from "next";

/** 2023/04/30 - 메타데이터 - by 1-blue */
export const metadata: Metadata = {
  ...defaultMatadata,

  title: "blegram | 회원가입",
  description: "회원가입 페이지입니다.",
};

/** 2023/04/30 - 회원가입 페이지 - by 1-blue */
const SignUpPage = () => <SignUp />;

export default SignUpPage;
