import { serverInstance } from ".";

// type
import type {
  ApiFetchFollowingsResponse,
  ApiFetchFollowingsHandler,
} from "@src/types/api";

/** 2023/05/12 - 특정 유저의 팔로잉들 요청 - by 1-blue */
const apiFetchFollowings: ApiFetchFollowingsHandler = async (body) => {
  const { data } = await serverInstance.get<ApiFetchFollowingsResponse>(
    "/followings",
    { params: body }
  );

  return data;
};

/** 2023/05/12 - 특정 유저의 팔로잉들 관련된 요청 - by 1-blue */
export const apiServiceFollowings = {
  /** 2023/05/12 - 특정 유저의 팔로잉들 요청 - by 1-blue */
  apiFetchFollowings,
};
