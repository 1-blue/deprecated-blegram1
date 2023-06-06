import { useCallback } from "react";
import { useRecoilState } from "recoil";

// atom
import { atomModalOfFollowing } from "@src/recoil/atoms";

/** 2023/05/13 - 특정 유저의 팔로잉들 전역 모달 훅 - by 1-blue */
const useFollowingModal = () => {
  const [followingModalData, setFollowingModalData] =
    useRecoilState(atomModalOfFollowing);

  /** 2023/05/13 - 모달 닫기 핸들러 - by 1-blue */
  const closeFollowingModal = useCallback(
    () => setFollowingModalData((prev) => ({ ...prev, isOpen: false })),
    [setFollowingModalData]
  );

  /** 2023/05/13 - 모달 열기 핸들러 - by 1-blue */
  const openFollowingModal = useCallback(
    (followingIdx: number, nickname: string) =>
      setFollowingModalData((prev) => ({
        ...prev,
        isOpen: true,
        followingIdx,
        nickname,
      })),
    [setFollowingModalData]
  );

  return {
    followingModalData,
    closeFollowingModal,
    openFollowingModal,
  };
};

export default useFollowingModal;
