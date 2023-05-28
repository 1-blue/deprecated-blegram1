import { serverInstance } from ".";

// type
import type {
  ApiFetchFollowersResponse,
  ApiFetchFollowersHandler,
} from "@src/types/api";

/** 2023/05/12 - 특정 유저의 팔로워들 요청 - by 1-blue */
const apiFetchFollowers: ApiFetchFollowersHandler = async (body) => {
  const { data } = await serverInstance.get<ApiFetchFollowersResponse>(
    "/followers",
    { params: body }
  );

  return data;
};

/** 2023/05/12 - 특정 유저의 팔로워들 관련된 요청 - by 1-blue */
export const apiServiceFollowers = {
  /** 2023/05/12 - 특정 유저의 팔로워들 요청 - by 1-blue */
  apiFetchFollowers,
};
