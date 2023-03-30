import { useQuery } from "react-query";

// api
import { apiServiceUser } from "@src/apis";

// key
import { queryKeys } from ".";

// type
import type { ApiFetchUserResponse } from "@src/types/api";

interface UseUserHandler {
  (nickname: string): {
    user?: ApiFetchUserResponse["user"];
    isFetchingUser: boolean;
  };
}

/** 2023/03/29 - 특정 유저 정보를 얻는 훅 - by 1-blue */
const useUser: UseUserHandler = (nickname) => {
  const { data, isLoading } = useQuery<ApiFetchUserResponse>(
    [queryKeys.user, nickname],
    () => apiServiceUser.apiFetchUser({ nickname })
  );

  return { user: data?.user, isFetchingUser: isLoading };
};

export default useUser;
