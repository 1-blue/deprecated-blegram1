import { atom } from "recoil";

interface AtomModalOfPost {
  isOpen: boolean;
  isMine: boolean;
  postIdx: null | number;
}
/** 2023/04/14 - post modal atom - by 1-blue */
export const atomModalOfPost = atom<AtomModalOfPost>({
  key: "AtomModalOfPost",
  default: {
    isOpen: false,
    isMine: false,
    postIdx: null,
  },
});

interface AtomModalOfLiker {
  isOpen: boolean;
  postIdx: null | number;
}
/** 2023/04/25 - liker modal atom - by 1-blue */
export const atomModalOfLiker = atom<AtomModalOfLiker>({
  key: "AtomModalOfLiker",
  default: {
    isOpen: false,
    postIdx: null,
  },
});
