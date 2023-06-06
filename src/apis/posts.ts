import { serverInstance } from ".";

// type
import type {
  ApiFetchPostsResponse,
  ApiFetchPostsHandler,
  ApiFetchWrittenPostsHandler,
  ApiFetchWrittenPostsResponse,
  ApiFetchBookmarkedPostsHandler,
  ApiFetchBookmarkedPostsResponse,
  ApiFetchLikedPostsHandler,
  ApiFetchLikedPostsResponse,
} from "@src/types/api";

/** 2023/04/08 - 게시글들 가져오기 요청 - by 1-blue */
const apiFetchPosts: ApiFetchPostsHandler = async (body) => {
  const { data } = await serverInstance.get<ApiFetchPostsResponse>("/posts", {
    params: body,
  });

  return data;
};

/** 2023/05/26 - 특정 유저가 작성한 게시글들 요청 - by 1-blue */
const apiFetchWrittenPosts: ApiFetchWrittenPostsHandler = async (body) => {
  const { data } = await serverInstance.get<ApiFetchWrittenPostsResponse>(
    "/posts/written",
    { params: body }
  );

  return data;
};

/** 2023/05/26 - 특정 유저가 북마크한 게시글들 요청 - by 1-blue */
const apiFetchBookmarkedPosts: ApiFetchBookmarkedPostsHandler = async (
  body
) => {
  const { data } = await serverInstance.get<ApiFetchBookmarkedPostsResponse>(
    "/posts/bookmarked",
    { params: body }
  );

  return data;
};

/** 2023/05/26 - 특정 유저가 좋아요한 게시글들 요청 - by 1-blue */
const apiFetchLikedPosts: ApiFetchLikedPostsHandler = async (body) => {
  const { data } = await serverInstance.get<ApiFetchLikedPostsResponse>(
    "/posts/liked",
    { params: body }
  );

  return data;
};

/** 2023/04/08 - 게시글들 관련된 요청 - by 1-blue */
export const apiServicePosts = {
  /** 2023/04/08 - 게시글들 가져오기 요청 - by 1-blue */
  apiFetchPosts,
  /** 2023/05/26 - 특정 유저가 작성한 게시글들 요청 - by 1-blue */
  apiFetchWrittenPosts,
  /** 2023/05/26 - 특정 유저가 북마크한 게시글들 요청 - by 1-blue */
  apiFetchBookmarkedPosts,
  /** 2023/05/26 - 특정 유저가 좋아요한 게시글들 요청 - by 1-blue */
  apiFetchLikedPosts,
};
