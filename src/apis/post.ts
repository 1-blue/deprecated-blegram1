import { serverInstance } from ".";

// type
import type {
  ApiUploadPostResponse,
  ApiUploadPostHandler,
  ApiDeletePostResponse,
  ApiDeletePostHandler,
} from "@src/types/api";

/** 2023/04/08 - 게시글 업로드 요청 - by 1-blue */
const apiUploadPost: ApiUploadPostHandler = async (body) => {
  const { data } = await serverInstance.post<ApiUploadPostResponse>(
    "/post",
    body
  );

  return data;
};

/** 2023/04/11 - 게시글 제거 요청 - by 1-blue */
const apiDeletePost: ApiDeletePostHandler = async (body) => {
  const { data } = await serverInstance.delete<ApiDeletePostResponse>("/post", {
    params: body,
  });

  return data;
};

/** 2023/04/08 - 게시글 관련된 요청 - by 1-blue */
export const apiServicePost = {
  /** 2023/04/08 - 게시글 업로드 요청 - by 1-blue */
  apiUploadPost,
  /** 2023/04/11 - 게시글 제거 요청 - by 1-blue */
  apiDeletePost,
};
