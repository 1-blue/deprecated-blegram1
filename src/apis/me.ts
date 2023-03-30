import { serverInstance } from ".";

// type
import type {
  ApiFetchMeHandler,
  ApiFetchMeResponse,
  ApiUpdateMeHandler,
  ApiUpdateMeResponse,
} from "@src/types/api";

/** 2023/03/16 - 로그인한 유저 정보 가져오기 요청 - by 1-blue */
const apiFetchMe: ApiFetchMeHandler = async () => {
  const { data } = await serverInstance.get<ApiFetchMeResponse>("/me");

  return data;
};

/** 2023/03/30 - 로그인한 유저 정보 수정 요청 - by 1-blue */
const apiUpdateMe: ApiUpdateMeHandler = async (body) => {
  const { data } = await serverInstance.patch<ApiUpdateMeResponse>("/me", {
    body,
  });

  return data;
};

/** 2023/03/30 - 로그인한 유저 관련된 요청 - by 1-blue */
export const apiServiceMe = {
  /** 2023/03/16 - 로그인한 유저 정보 요청 - by 1-blue */
  apiFetchMe,
  /** 2023/03/30 - 로그인한 유저 정보 수정 요청 - by 1-blue */
  apiUpdateMe,
};
