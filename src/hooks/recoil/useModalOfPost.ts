import { useCallback } from "react";
import { useRecoilState } from "recoil";

// atom
import { modalAtom } from "@src/recoil/atoms";

/** 2023/04/14 - 전역 모달 훅 - by 1-blue */
const useModalOfPost = () => {
  const [modalData, setModalData] = useRecoilState(modalAtom);

  /** 2023/04/14 - 모달 닫기 핸들러 - by 1-blue */
  const closeModal = useCallback(
    () => setModalData((prev) => ({ ...prev, isOpen: false })),
    [setModalData]
  );

  /** 2023/04/14 - 모달 열기 핸들러 - by 1-blue */
  const openModal = useCallback(
    (isMine: boolean, postIdx: number) =>
      setModalData((prev) => ({ ...prev, isOpen: true, isMine, postIdx })),
    [setModalData]
  );

  return { modalData, closeModal, openModal };
};

export default useModalOfPost;
