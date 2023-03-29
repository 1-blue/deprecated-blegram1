import { useQuery } from "react-query";

// api
import { apiServiceAuth } from "@src/apis";

// type
import type { ApiFetchMeResponse } from "@src/types/api";

/** 2023/03/29 - 유저 정보를 얻는 훅 - by 1-blue */
const useUser = () => {
  const { data } = useQuery<ApiFetchMeResponse>(
    "me",
    apiServiceAuth.apiFetchMe
  );

  return { user: data?.user };
};

export default useUser;
