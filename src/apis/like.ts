import { serverInstance } from ".";

// type
import type {
  ApiUploadLikeOfPostHandler,
  ApiUploadLikeOfPostResponse,
  ApiDeleteLikeOfPostHandler,
  ApiDeleteLikeOfPostResponse,
  ApiUploadLikeOfCommentHandler,
  ApiUploadLikeOfCommentResponse,
  ApiDeleteLikeOfCommentHandler,
  ApiDeleteLikeOfCommentResponse,
} from "@src/types/api";

/** 2023/04/24 - 게시글 좋아요 추가 요청 - by 1-blue */
const apiUploadLikeOfPost: ApiUploadLikeOfPostHandler = async (body) => {
  const { data } = await serverInstance.post<ApiUploadLikeOfPostResponse>(
    "/like/post",
    body
  );

  return data;
};

/** 2023/04/24 - 게시글 좋아요 제거 요청 - by 1-blue */
const apiDeleteLikeOfPost: ApiDeleteLikeOfPostHandler = async (body) => {
  const { data } = await serverInstance.delete<ApiDeleteLikeOfPostResponse>(
    "/like/post",
    { params: body }
  );

  return data;
};

/** 2023/04/27 - 댓글 좋아요 추가 요청 - by 1-blue */
const apiUploadLikeOfComment: ApiUploadLikeOfCommentHandler = async (body) => {
  const { data } = await serverInstance.post<ApiUploadLikeOfCommentResponse>(
    "/like/comment",
    body
  );

  return data;
};

/** 2023/04/27 - 댓글 좋아요 제거 요청 - by 1-blue */
const apiDeleteLikeOfComment: ApiDeleteLikeOfCommentHandler = async (body) => {
  const { data } = await serverInstance.delete<ApiDeleteLikeOfCommentResponse>(
    "/like/comment",
    { params: body }
  );

  return data;
};

/** 2023/04/24 - 좋아요 관련된 요청 - by 1-blue */
export const apiServiceLike = {
  /** 2023/04/24 - 게시글 좋아요 추가 요청 - by 1-blue */
  apiUploadLikeOfPost,
  /** 2023/04/24 - 게시글 좋아요 제거 요청 - by 1-blue */
  apiDeleteLikeOfPost,
  /** 2023/04/27 - 댓글 좋아요 추가 요청 - by 1-blue */
  apiUploadLikeOfComment,
  /** 2023/04/27 - 댓글 좋아요 제거 요청 - by 1-blue */
  apiDeleteLikeOfComment,
};
