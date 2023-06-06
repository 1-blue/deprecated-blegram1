// component
import SearchBar from "./SearchBar";

// ssr
import { getMetadata } from "@src/shared/metadata";
import type { Metadata } from "next";

/** 2023/05/04 - 메타데이터 - by 1-blue */
export const metadata: Metadata = getMetadata({
  title: "검색",
  description: "특정 해시태그를 갖는 게시글 or 유저를 검색하는 페이지입니다.",
  url: "/search",
});

/** 2023/03/24 - 검색 페이지 - by 1-blue */
const SearchPage = () => <SearchBar />;

export default SearchPage;
