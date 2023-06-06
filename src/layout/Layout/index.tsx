"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// state
import usePostModal from "@src/hooks/recoil/usePostModal";
import usePostLikerModal from "@src/hooks/recoil/usePostLikerModal";
import useCommentLikerModal from "@src/hooks/recoil/useCommentLikerModal";
import useFollowerModal from "@src/hooks/recoil/useFollowerModal";
import useFollowingModal from "@src/hooks/recoil/useFollowingModal";

// component
import Header from "@src/layout/Header";
import Main from "@src/layout/Main";
import Footer from "@src/layout/Footer";
import ASide from "@src/layout/ASide";
import Modal from "@src/components/common/Modal";

/** 2023/03/23 - 레이아웃을 적용하는 컴포넌트 - by 1-blue */
const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  /** 2023/06/03 - 단일 게시글 모달 - by 1-blue */
  const postIdx = useSearchParams()?.get("postIdx");

  /** 2023/06/02 - 게시글의 모달관련 훅 - by 1-blue */
  const { postModalData } = usePostModal();
  /** 2023/06/02 - 게시글에 좋아요 누른 사람들 모달 훅 - by 1-blue */
  const { postLikerModalData } = usePostLikerModal();
  /** 2023/06/02 - 댓글에 좋아요 누른 사람들 모달 훅 - by 1-blue */
  const { commentLikerModalData } = useCommentLikerModal();
  /** 2023/05/12 - 팔로워 모달관련 훅 - by 1-blue */
  const { followerModalData } = useFollowerModal();
  /** 2023/05/13 - 팔로잉 모달관련 훅 - by 1-blue */
  const { followingModalData } = useFollowingModal();

  /** 2023/06/02 - 외부 스크롤 금지 - by 1-blue */
  useEffect(() => {
    // 모달이 열려있다면
    if (
      postIdx ||
      postModalData.isOpen ||
      postLikerModalData.isOpen ||
      commentLikerModalData.isOpen ||
      followerModalData.isOpen ||
      followingModalData.isOpen
    ) {
      document.body.style.overflow = "hidden";
    }
    // 모달이 닫혀있다면
    else {
      document.body.style.overflow = "auto";
    }
  }, [
    postIdx,
    postModalData,
    postLikerModalData,
    commentLikerModalData,
    followerModalData,
    followingModalData,
  ]);

  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
      <ASide />

      {/* 게시글 모달 */}
      {postModalData.isOpen && <Modal.Post />}
      {/* 게시글에 좋아요한 사람들 모달 */}
      {postLikerModalData.isOpen && <Modal.PostLiker />}
      {/* 댓글에 좋아요한 사람들 모달 */}
      {commentLikerModalData.isOpen && <Modal.CommentLiker />}
      {/* 팔로워 모달 */}
      {followerModalData.isOpen && <Modal.Follower />}
      {/* 팔로잉 모달 */}
      {followingModalData.isOpen && <Modal.Following />}

      {/* 단일 게시글 모달 */}
      {postIdx && <Modal.SinglePost postIdx={+postIdx} />}
    </>
  );
};

export default Layout;
