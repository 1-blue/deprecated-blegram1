import { serverInstance } from ".";

// type
import type {
  ApiFetchCommentsResponse,
  ApiFetchCommentsHandler,
} from "@src/types/api";

/** 2023/04/19 - 댓글들 가져오기 요청 - by 1-blue */
const apiFetchComments: ApiFetchCommentsHandler = async (body) => {
  const { data } = await serverInstance.get<ApiFetchCommentsResponse>(
    "/comments",
    { params: body }
  );

  return data;
};

/** 2023/04/19 - 댓글들 관련된 요청 - by 1-blue */
export const apiServiceComments = {
  /** 2023/04/19 - 댓글들 가져오기 요청 - by 1-blue */
  apiFetchComments,
};
