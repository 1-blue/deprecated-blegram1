import { atom } from "recoil";

interface ModalAtom {
  isOpen: boolean;
  isMine: boolean;
  postIdx: null | number;
}

/** 2023/04/14 - modal atom - by 1-blue */
export const modalAtom = atom<ModalAtom>({
  key: "modalAtom",
  default: {
    isOpen: false,
    isMine: false,
    postIdx: null,
  },
});
