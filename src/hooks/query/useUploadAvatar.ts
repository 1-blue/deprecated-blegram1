import { useMutation } from "react-query";
import { toast } from "react-toastify";

// api
import { apiServicePhoto } from "@src/apis";

// key
import { queryKeys } from ".";

// type
import type { UseMutateFunction } from "react-query";
import type {
  ApiUploadPhotoRequest,
  ApiUploadPhotoResponse,
} from "@src/types/api";

/** 2023/04/01 - S3에 프로필 이미지 추가 훅 - by 1-blue */
const useUploadAvatar = (): UseMutateFunction<
  ApiUploadPhotoResponse,
  unknown,
  ApiUploadPhotoRequest,
  unknown
> => {
  const { mutate } = useMutation(apiServicePhoto.apiUploadPhoto, {
    onSuccess(data, variables, context) {
      // toast.success("프로필 이미지를 변경했습니다.");
    },
  });

  return mutate;
};

export default useUploadAvatar;
