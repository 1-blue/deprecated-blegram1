import { AxiosError } from "axios";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { toast } from "react-toastify";

/** 2023/03/30 - 에러 처리 핸들러 - by 1-blue */
const queryErrorHandler = (error: unknown) => {
  let message = "알 수 없는 오류가 발생했습니다.";

  if (error instanceof AxiosError) {
    message = error.response?.data.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  toast.warning(message);
};

/** 2023/03/30 - 성공 처리 핸들러 - by 1-blue */
const querySuccessHandler = (data: unknown) => {
  if (
    typeof data === "object" &&
    data &&
    "message" in data &&
    typeof data.message === "string"
  ) {
    toast.success(data.message);
  }
};

/** 2023/03/30 - 전역 설정 적용 - by 1-blue */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      onSuccess: querySuccessHandler,
      staleTime: 1000 * 60 * 15, // 15 분
      cacheTime: 1000 * 60 * 10, // 10 분
    },
    mutations: {
      onError: queryErrorHandler,
      onSuccess: querySuccessHandler,
    },
  },
});

/** 2023/03/26 - "react-query" Provider 적용 - by 1-blue */
const MyReactQueryProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen position="top-left" />
    {children}
  </QueryClientProvider>
);

export default MyReactQueryProvider;
