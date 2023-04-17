import { useQuery } from "react-query";

// api
import { apiServiceMe } from "@src/apis";

// key
import { queryKeys } from ".";

// type
import type { ApiFetchMeResponse } from "@src/types/api";
type UseMeHandler = (once?: boolean) => {
  me?: ApiFetchMeResponse["user"];
  isFetchingMe: boolean;
};

/** 2023/03/29 - 로그인한 유저 정보를 얻는 훅 - by 1-blue */
const useMe: UseMeHandler = () => {
  const { data, isLoading } = useQuery<ApiFetchMeResponse>(
    [queryKeys.user, "me"],
    apiServiceMe.apiFetchMe,
    { onSuccess() {}, onError() {}, retry: false }
  );

  return { me: data?.user, isFetchingMe: isLoading };
};

export default useMe;
