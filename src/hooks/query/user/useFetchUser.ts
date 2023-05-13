import { useQuery } from "react-query";

// api
import { apiServiceUser } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type { ApiFetchUserResponse } from "@src/types/api";

interface UseFetchHandler {
  ({
    nickname,
    initialData,
  }: {
    nickname: string;
    initialData?: ApiFetchUserResponse;
  }): {
    user?: ApiFetchUserResponse["user"];
    isFetchingUser: boolean;
  };
}

/** 2023/03/29 - 특정 유저 정보를 얻는 훅 - by 1-blue */
const useFetchUser: UseFetchHandler = ({ nickname, initialData }) => {
  const { data, isLoading } = useQuery<ApiFetchUserResponse>(
    [queryKeys.user, nickname],
    () => apiServiceUser.apiFetchUser({ nickname }),
    {
      retry: 2,
      refetchOnWindowFocus: false,
      // ssr
      ...(initialData && { initialData }),
      onSuccess() {},
    }
  );

  return { user: data?.user, isFetchingUser: isLoading };
};

export default useFetchUser;
