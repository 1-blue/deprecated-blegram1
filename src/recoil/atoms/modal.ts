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

interface AtomModalOfPostLiker {
  isOpen: boolean;
  postIdx: null | number;
}
/** 2023/04/25 - post liker modal atom - by 1-blue */
export const atomModalOfPostLiker = atom<AtomModalOfPostLiker>({
  key: "AtomModalOfPostLiker",
  default: {
    isOpen: false,
    postIdx: null,
  },
});

interface AtomModalOfCommentLiker {
  isOpen: boolean;
  postIdx: null | number;
  commentIdx: null | number;
}
/** 2023/04/28 - comment liker modal atom - by 1-blue */
export const atomModalOfCommentLiker = atom<AtomModalOfCommentLiker>({
  key: "AtomModalOfCommentLiker",
  default: {
    isOpen: false,
    postIdx: null,
    commentIdx: null,
  },
});
