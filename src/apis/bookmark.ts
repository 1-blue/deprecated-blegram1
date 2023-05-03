import { serverInstance } from ".";

// type
import type {
  ApiUploadBookmarkResponse,
  ApiUploadBookmarkHandler,
  ApiDeleteBookmarkHandler,
  ApiDeleteBookmarkResponse,
} from "@src/types/api";

/** 2023/05/02 - 북마크 업로드 요청 - by 1-blue */
const apiUploadBookmark: ApiUploadBookmarkHandler = async (body) => {
  const { data } = await serverInstance.post<ApiUploadBookmarkResponse>(
    "/bookmark",
    body
  );

  return data;
};

/** 2023/05/02 - 북마크 제거 요청 - by 1-blue */
const apiDeleteBookmark: ApiDeleteBookmarkHandler = async (body) => {
  const { data } = await serverInstance.delete<ApiDeleteBookmarkResponse>(
    "/bookmark",
    { params: body }
  );

  return data;
};

/** 2023/05/02 - 북마크 관련된 요청 - by 1-blue */
export const apiServiceBookmark = {
  /** 2023/05/02 - 북마크 업로드 요청 - by 1-blue */
  apiUploadBookmark,
  /** 2023/05/02 - 북마크 제거 요청 - by 1-blue */
  apiDeleteBookmark,
};
