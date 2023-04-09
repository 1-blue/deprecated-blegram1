import { serverInstance } from ".";

// type
import type {
  ApiFetchPostsResponse,
  ApiFetchPostsHandler,
} from "@src/types/api";

/** 2023/04/08 - 게시글들 가져오기 요청 - by 1-blue */
const apiFetchPosts: ApiFetchPostsHandler = async (body) => {
  const { data } = await serverInstance.get<ApiFetchPostsResponse>("/posts", {
    params: body,
  });

  return data;
};

/** 2023/04/08 - 게시글들 관련된 요청 - by 1-blue */
export const apiServicePosts = {
  /** 2023/04/08 - 게시글들 가져오기 요청 - by 1-blue */
  apiFetchPosts,
};
