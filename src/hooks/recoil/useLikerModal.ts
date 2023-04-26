import { useCallback } from "react";
import { useRecoilState } from "recoil";

// atom
import { atomModalOfLiker } from "@src/recoil/atoms";

/** 2023/04/25 - 전역 좋아요 누른 사람 모달 훅 - by 1-blue */
const useLikerModal = () => {
  const [likerModalData, setLikerModalData] = useRecoilState(atomModalOfLiker);

  /** 2023/04/25 - 모달 닫기 핸들러 - by 1-blue */
  const closeLikerModal = useCallback(
    () => setLikerModalData((prev) => ({ ...prev, isOpen: false })),
    [setLikerModalData]
  );

  /** 2023/04/25 - 모달 열기 핸들러 - by 1-blue */
  const openLikerModal = useCallback(
    (postIdx: number) =>
      setLikerModalData((prev) => ({ ...prev, isOpen: true, postIdx })),
    [setLikerModalData]
  );

  return { likerModalData, closeLikerModal, openLikerModal };
};

export default useLikerModal;
