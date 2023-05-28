import { atom } from "recoil";

interface AtomModalOfPost {
  isOpen: boolean;
  isMine: boolean;
  postIdx: null | number;
  isBookmarked: boolean;
}
/** 2023/04/14 - post modal atom - by 1-blue */
export const atomModalOfPost = atom<AtomModalOfPost>({
  key: "AtomModalOfPost",
  default: {
    isOpen: false,
    isMine: false,
    postIdx: null,
    isBookmarked: false,
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

interface AtomModalOfFollower {
  isOpen: boolean;
  followerIdx: number | null;
  nickname: string | null;
}
/** 2023/05/12 - follower modal atom - by 1-blue */
export const atomModalOfFollower = atom<AtomModalOfFollower>({
  key: "AtomModalOfFollower",
  default: {
    isOpen: false,
    followerIdx: null,
    nickname: null,
  },
});

interface AtomModalOfFollowing {
  isOpen: boolean;
  followingIdx: number | null;
  nickname: string | null;
}
/** 2023/05/13 - following modal atom - by 1-blue */
export const atomModalOfFollowing = atom<AtomModalOfFollowing>({
  key: "AtomModalOfFollowing",
  default: {
    isOpen: false,
    followingIdx: null,
    nickname: null,
  },
});
