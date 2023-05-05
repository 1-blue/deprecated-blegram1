import { serverInstance } from ".";

// type
import type {
  ApiFetchSuggestedResponse,
  ApiFetchSuggestedHandler,
} from "@src/types/api";

/** 2023/05/04 - 추천 검색어 요청 ( 해시태그 및 유저 ) - by 1-blue */
const apiFetchSuggested: ApiFetchSuggestedHandler = async (body) => {
  const { data } = await serverInstance.get<ApiFetchSuggestedResponse>(
    "/search/suggested",
    { params: body }
  );

  return data;
};

/** 2023/05/04 - 검색 관련된 요청 - by 1-blue */
export const apiServiceSearch = {
  /** 2023/05/04 - 추천 검색어 요청 ( 해시태그 및 유저 ) - by 1-blue */
  apiFetchSuggested,
};
