import { useCallback } from "react";
import { useRecoilState } from "recoil";

// atom
import { atomModalOfPost } from "@src/recoil/atoms";

/** 2023/04/14 - 전역 게시글 모달 훅 - by 1-blue */
const usePostModal = () => {
  const [postModalData, setPostModalData] = useRecoilState(atomModalOfPost);

  /** 2023/04/14 - 모달 닫기 핸들러 - by 1-blue */
  const closePostModal = useCallback(
    () => setPostModalData((prev) => ({ ...prev, isOpen: false })),
    [setPostModalData]
  );

  /** 2023/04/14 - 모달 열기 핸들러 - by 1-blue */
  const openPostModal = useCallback(
    (isMine: boolean, postIdx: number) =>
      setPostModalData((prev) => ({ ...prev, isOpen: true, isMine, postIdx })),
    [setPostModalData]
  );

  return { postModalData, closePostModal, openPostModal };
};

export default usePostModal;
