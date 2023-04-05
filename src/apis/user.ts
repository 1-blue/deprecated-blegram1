import { serverInstance } from ".";

// type
import type { ApiFetchUserResponse, ApiFetchUserHandler } from "@src/types/api";

/** 2023/03/29 - 특정 유저 정보 요청 - by 1-blue */
const apiFetchUser: ApiFetchUserHandler = async ({ nickname }) => {
  const { data } = await serverInstance.get<ApiFetchUserResponse>("/user", {
    params: { nickname },
  });

  return data;
};

/** 2023/03/29 - 유저 관련된 요청 - by 1-blue */
export const apiServiceUser = {
  /** 2023/03/29 - 특정 유저 정보 요청 - by 1-blue */
  apiFetchUser,
};
