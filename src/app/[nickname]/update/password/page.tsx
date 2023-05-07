// component
import PasswordUpdate from "./PasswordUpdate";

// ssr
import { getMetadata } from "@src/shared/metadata";
import type { Metadata } from "next";

/** 2023/04/30 - 메타데이터 - by 1-blue */
export const metadata: Metadata = getMetadata({
  title: "비밀번호 수정",
  description: "프로필 비밀번호 수정 페이지입니다.",
});

/** 2023/03/31 - 비밀번호 수정 페이지 - by 1-blue */
const PasswordUpdatePage = () => <PasswordUpdate />;

export default PasswordUpdatePage;
