import { serverInstance } from ".";

// type
import type {
  ApiUploadPostResponse,
  ApiUploadPostHandler,
} from "@src/types/api";

/** 2023/04/08 - 게시글 업로드 요청 - by 1-blue */
const apiUploadPost: ApiUploadPostHandler = async (body) => {
  const { data } = await serverInstance.post<ApiUploadPostResponse>(
    "/post",
    body
  );

  return data;
};

/** 2023/04/08 - 게시글 관련된 요청 - by 1-blue */
export const apiServicePost = {
  /** 2023/04/08 - 게시글 업로드 요청 - by 1-blue */
  apiUploadPost,
};
