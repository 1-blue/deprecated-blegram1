import PostUpload from "./PostUpload";

// ssr
import { getMetadata } from "@src/shared/metadata";
import type { Metadata } from "next";

/** 2023/04/30 - 메타데이터 - by 1-blue */
export const metadata: Metadata = getMetadata({
  title: "게시글 업로드",
  description: "게시글을 업로드하는 페이지입니다.",
  url: "/upload",
});

/** 2023/04/30 - 게시글 업로드 페이지 - by 1-blue  */
const PostUploadPage = () => <PostUpload />;

export default PostUploadPage;
