import useFetchMe from "./useFetchMe";
import useUpdateAvatar from "./useUpdateAvatar";
import useUpdateMe from "./useUpdateMe";
import useUpdatePassword from "./useUpdatePassword";

/** 2023/05/01 - 로그인한 유저에 대한 훅들 - by 1-blue */
export const useMe = {
  /** 2023/03/29 - 로그인한 유저 정보를 얻는 훅 - by 1-blue */
  useFetchMe,
  /** 2023/04/01 - 프로필 이미지 추가 훅 - by 1-blue */
  useUpdateAvatar,
  /** 2023/03/30 - 로그인한 유저 정보 수정 훅 - by 1-blue */
  useUpdateMe,
  /** 2023/03/31 - 로그인한 유저 비밀번호 수정 훅 - by 1-blue */
  useUpdatePassword,
};
