"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// util
import { splitPhotoURL } from "@src/utils";

// hook
import { usePosts } from "@src/hooks/query";
import usePostModal from "@src/hooks/recoil/usePostModal";
import usePostLikerModal from "@src/hooks/recoil/usePostLikerModal";
import useCommentLikerModal from "@src/hooks/recoil/useCommentLikerModal";

// component
import InfiniteScrollContainer from "@src/components/common/InfiniteScrollContainer";
import PostHeader from "@src/components/Post/PostHeader";
import PostPhotos from "@src/components/Post/PostPhotos";
import PostFooter from "@src/components/Post/PostFooter";
import Modal from "@src/components/common/Modal";
import Skeleton from "@src/components/common/Skeleton";

// style
import StyledPost from "./style";

/** 2023/04/09 - 게시글 컴포넌트 - by 1-blue */
const Post = () => {
  /** FIXME: 양방향 스크롤링으로 변경하기 */
  const searchParams = useSearchParams();
  const postIdx = searchParams?.get("postIdx");

  /** 2023/04/10 - 무한 스크롤링을 적용한 게시글들의 데이터 - by 1-blue */
  const { data, hasNextPage, fetchNextPage, isFetching } =
    usePosts.useFetchPosts({
      take: 10,
      lastIdx: postIdx ? +postIdx : undefined,
    });

  /** 2023/04/11 - 게시글의 모달관련 훅 - by 1-blue */
  const { postModalData } = usePostModal();
  /** 2023/04/25 - 게시글에 좋아요 누른 사람들 모달 훅 - by 1-blue */
  const { postLikerModalData } = usePostLikerModal();
  /** 2023/04/28 - 댓글에 좋아요 누른 사람들 모달 훅 - by 1-blue */
  const { commentLikerModalData } = useCommentLikerModal();

  /** 2023/04/25 - 외부 스크롤 금지 - by 1-blue */
  useEffect(() => {
    // 모달이 열려있다면
    if (postModalData.isOpen || postLikerModalData.isOpen) {
      document.body.style.overflow = "hidden";
    }
    // 모달이 닫혀있다면
    else {
      document.body.style.overflow = "auto";
    }
  }, [postModalData, postLikerModalData]);

  return (
    <>
      <InfiniteScrollContainer
        hasMore={hasNextPage && !isFetching}
        fetchMore={fetchNextPage}
      >
        <StyledPost>
          {data?.pages?.map((page) =>
            page.posts?.map((post) => (
              <li key={post.idx}>
                <PostHeader user={post.user} postIdx={post.idx} />
                <PostPhotos photos={splitPhotoURL(post.photos)} />
                <PostFooter
                  content={post.content}
                  postIdx={post.idx}
                  count={post._count}
                  postLikers={post.postLikers}
                  bookmarkers={post.bookMarkers}
                />
              </li>
            ))
          )}
        </StyledPost>
      </InfiniteScrollContainer>

      {isFetching && <Skeleton.Post />}

      {postModalData.isOpen && <Modal.Post />}
      {postLikerModalData.isOpen && <Modal.PostLiker />}
      {commentLikerModalData.isOpen && <Modal.CommentLiker />}
    </>
  );
};

export default Post;
