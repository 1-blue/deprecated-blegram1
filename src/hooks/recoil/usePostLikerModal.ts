import { useCallback } from "react";
import { useRecoilState } from "recoil";

// atom
import { atomModalOfPostLiker } from "@src/recoil/atoms";

/** 2023/04/25 - 게시글에 좋아요 누른 사람들 전역 모달 훅 - by 1-blue */
const usePostLikerModal = () => {
  const [postLikerModalData, setPostLikerModalData] =
    useRecoilState(atomModalOfPostLiker);

  /** 2023/04/25 - 모달 닫기 핸들러 - by 1-blue */
  const closeLikerModal = useCallback(
    () => setPostLikerModalData((prev) => ({ ...prev, isOpen: false })),
    [setPostLikerModalData]
  );

  /** 2023/04/25 - 모달 열기 핸들러 - by 1-blue */
  const openLikerModal = useCallback(
    (postIdx: number) =>
      setPostLikerModalData((prev) => ({ ...prev, isOpen: true, postIdx })),
    [setPostLikerModalData]
  );

  return {
    postLikerModalData,
    closeLikerModal,
    openLikerModal,
  };
};

export default usePostLikerModal;
