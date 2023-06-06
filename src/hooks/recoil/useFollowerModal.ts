import { useCallback } from "react";
import { useRecoilState } from "recoil";

// atom
import { atomModalOfFollower } from "@src/recoil/atoms";

/** 2023/05/12 - 특정 유저의 팔로워들 전역 모달 훅 - by 1-blue */
const useFollowerModal = () => {
  const [followerModalData, setFollowerModalData] =
    useRecoilState(atomModalOfFollower);

  /** 2023/05/12 - 모달 닫기 핸들러 - by 1-blue */
  const closeFollowerModal = useCallback(
    () => setFollowerModalData((prev) => ({ ...prev, isOpen: false })),
    [setFollowerModalData]
  );

  /** 2023/05/12 - 모달 열기 핸들러 - by 1-blue */
  const openFollowerModal = useCallback(
    (followerIdx: number, nickname: string) =>
      setFollowerModalData((prev) => ({
        ...prev,
        isOpen: true,
        followerIdx,
        nickname,
      })),
    [setFollowerModalData]
  );

  return {
    followerModalData,
    closeFollowerModal,
    openFollowerModal,
  };
};

export default useFollowerModal;
