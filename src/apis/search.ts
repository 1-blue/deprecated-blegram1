import { serverInstance } from ".";

// type
import type {
  ApiFetchSuggestedResponse,
  ApiFetchSuggestedHandler,
  ApiFetchHashtagPostsHandler,
  ApiFetchHashtagPostsResponse,
} from "@src/types/api";

/** 2023/05/04 - 추천 검색어 요청 ( 해시태그 및 유저 ) - by 1-blue */
const apiFetchSuggested: ApiFetchSuggestedHandler = async (body) => {
  const { data } = await serverInstance.get<ApiFetchSuggestedResponse>(
    "/search/suggested",
    { params: body }
  );

  return data;
};

/** 2023/05/05 - 특정 해시태그를 갖는 게시글들 요청 - by 1-blue */
const apiFetchHashtagPosts: ApiFetchHashtagPostsHandler = async ({
  hashtag,
  ...body
}) => {
  const { data } = await serverInstance.get<ApiFetchHashtagPostsResponse>(
    `/search/post/${hashtag}`,
    { params: body }
  );

  return data;
};

/** 2023/05/04 - 검색 관련된 요청 - by 1-blue */
export const apiServiceSearch = {
  /** 2023/05/04 - 추천 검색어 요청 ( 해시태그 및 유저 ) - by 1-blue */
  apiFetchSuggested,
  /** 2023/05/05 - 특정 해시태그를 갖는 게시글들 요청 - by 1-blue */
  apiFetchHashtagPosts,
};
