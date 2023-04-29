import { useCallback } from "react";
import { useRecoilState } from "recoil";

// atom
import { atomModalOfCommentLiker } from "@src/recoil/atoms";

/** 2023/04/28 - 댓글에 좋아요 누른 사람들 전역 모달 훅 - by 1-blue */
const useCommentLikerModal = () => {
  const [commentLikerModalData, setCommentLikerModalData] = useRecoilState(
    atomModalOfCommentLiker
  );

  /** 2023/04/25 - 모달 닫기 핸들러 - by 1-blue */
  const closeLikerModal = useCallback(
    () => setCommentLikerModalData((prev) => ({ ...prev, isOpen: false })),
    [setCommentLikerModalData]
  );

  /** 2023/04/25 - 모달 열기 핸들러 - by 1-blue */
  const openLikerModal = useCallback(
    (postIdx: number, commentIdx: number) =>
      setCommentLikerModalData((prev) => ({
        ...prev,
        isOpen: true,
        postIdx,
        commentIdx,
      })),
    [setCommentLikerModalData]
  );

  return {
    commentLikerModalData,
    closeLikerModal,
    openLikerModal,
  };
};

export default useCommentLikerModal;
