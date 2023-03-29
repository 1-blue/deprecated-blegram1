import { AxiosError } from "axios";
import { QueryClientProvider, QueryClient, QueryCache } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { toast } from "react-toastify";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError(error, query) {
      let message = "알 수 없는 오류가 발생했습니다.";

      if (error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      if (error instanceof Error) {
        message = error.message;
      }

      toast.warning(message);
    },
    onSuccess(data, query) {
      if (
        typeof data === "object" &&
        data &&
        "message" in data &&
        typeof data.message === "string"
      ) {
        toast.success(data.message);
      }
    },
  }),
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
