import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

// api
import { apiServicePhoto } from "@src/apis";

// key
import { queryKeys } from ".";

// type
import type { UseMutateFunction } from "react-query";
import type {
  ApiUpdatePhotoRequest,
  ApiUpdatePhotoResponse,
} from "@src/types/api";

/** 2023/04/01 - 프로필 이미지 추가 훅 ( 서버 ) - by 1-blue */
const useUpdateAvatar = (): UseMutateFunction<
  ApiUpdatePhotoResponse,
  unknown,
  ApiUpdatePhotoRequest,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServicePhoto.apiUpdatePhoto, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries([queryKeys.user]);

      toast.success(data.message);
    },
  });

  return mutate;
};

export default useUpdateAvatar;
