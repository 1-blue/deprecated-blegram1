import SignUp from "./SignUp";

// ssr
import { getMetadata } from "@src/shared/metadata";
import type { Metadata } from "next";

/** 2023/04/30 - 메타데이터 - by 1-blue */
export const metadata: Metadata = getMetadata({
  title: "회원가입",
  description: "회원가입 페이지입니다.",
  url: "/signup",
});

/** 2023/04/30 - 회원가입 페이지 - by 1-blue */
const SignUpPage = () => <SignUp />;

export default SignUpPage;
