import { serverInstance } from ".";

// type
import type {
  ApiFetchCommentLikersHandler,
  ApiFetchCommentLikersResponse,
  ApiFetchPostLikersHandler,
  ApiFetchPostLikersResponse,
} from "@src/types/api";

/** 2023/04/25 - 게시글에 좋아요 누른 사람들 요청 - by 1-blue */
const apiFetchPostLikers: ApiFetchPostLikersHandler = async (body) => {
  const { data } = await serverInstance.get<ApiFetchPostLikersResponse>(
    "/likers/post",
    { params: body }
  );

  return data;
};

/** 2023/04/28 - 댓글에 좋아요 누른 사람들 요청 - by 1-blue */
const apiFetchCommentLikers: ApiFetchCommentLikersHandler = async (body) => {
  const { data } = await serverInstance.get<ApiFetchCommentLikersResponse>(
    "/likers/comment",
    { params: body }
  );

  return data;
};

/** 2023/04/25 - 좋아요 관련된 요청 - by 1-blue */
export const apiServiceLikers = {
  /** 2023/04/25 - 게시글에 좋아요 누른 사람들 요청 - by 1-blue */
  apiFetchPostLikers,
  /** 2023/04/28 - 댓글에 좋아요 누른 사람들 요청 - by 1-blue */
  apiFetchCommentLikers,
};
