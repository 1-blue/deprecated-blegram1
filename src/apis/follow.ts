import { serverInstance } from ".";

// type
import type {
  ApiCreateFollowResponse,
  ApiCreateFollowHandler,
  ApiDeleteFollowResponse,
  ApiDeleteFollowHandler,
} from "@src/types/api";

/** 2023/05/09 - 팔로우 요청 - by 1-blue */
const apiCreateFollow: ApiCreateFollowHandler = async (body) => {
  const { data } = await serverInstance.post<ApiCreateFollowResponse>(
    "/follow",
    body
  );

  return data;
};
/** 2023/05/09 - 언팔로우 요청 - by 1-blue */
const apiDeleteFollow: ApiDeleteFollowHandler = async (body) => {
  const { data } = await serverInstance.delete<ApiDeleteFollowResponse>(
    "/follow",
    {
      params: body,
    }
  );

  return data;
};

/** 2023/05/09 - 팔로우 관련된 요청 - by 1-blue */
export const apiServiceFollow = {
  /** 2023/05/09 - 팔로우 요청 - by 1-blue */
  apiCreateFollow,
  /** 2023/05/09 - 언팔로우 요청 - by 1-blue */
  apiDeleteFollow,
};
