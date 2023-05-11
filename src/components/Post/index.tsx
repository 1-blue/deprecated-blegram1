"use client";

import { useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

// util
import { splitPhotoURL } from "@src/utils";

// hook
import { useFollow, useMe, usePosts } from "@src/hooks/query";
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
import Title from "@src/components/common/Title";

// style
import StyledPost from "./style";

// type
import type { ApiFetchPostsResponse } from "@src/types/api";
interface Props {
  initialData?: ApiFetchPostsResponse;
}

/** 2023/04/09 - 게시글 컴포넌트 - by 1-blue */
const Post: React.FC<Props> = ({ initialData }) => {
  /** FIXME: 양방향 스크롤링으로 변경하기 */
  const searchParams = useSearchParams();
  const postIdx = searchParams?.get("postIdx");

  /** 2023/04/10 - 무한 스크롤링을 적용한 게시글들의 데이터 - by 1-blue */
  const { data, hasNextPage, fetchNextPage, isFetching } =
    usePosts.useFetchPosts({
      take: 10,
      lastIdx: postIdx ? +postIdx : undefined,
      // FIXME: 이 값을 그대로 사용하면 좋아요/북마크 등 로그인 시 판단할 데이터를 제대로 판단하지 못함
      // initialData,
    });

  /** 2023/04/11 - 게시글의 모달관련 훅 - by 1-blue */
  const { postModalData, openPostModal } = usePostModal();
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

  /** 2023/05/09 - 로그인한 유저의 정보 - by 1-blue */
  const { me } = useMe.useFetchMe();

  /** 2023/05/09 - 팔로우 요청 훅 - by 1-blue */
  const mutateFollow = useFollow.useCreateFollow();
  /** 2023/05/09 - 언팔로우 요청 훅 - by 1-blue */
  const mutateUnfollow = useFollow.useDeleteFollow();

  /** 2023/05/09 - 팔로우/언팔로우 요청 || 전역 게시글 모달 열기 - by 1-blue */
  const onClickBubblingHanlder: React.MouseEventHandler<HTMLUListElement> =
    useCallback(
      (e) => {
        if (!(e.target instanceof HTMLButtonElement)) return;
        if (!e.target.dataset.type) return;

        // "follow" or "modal"
        const { type } = e.target.dataset;

        // 팔로우 요청에 대한 처리
        if (type === "follow") {
          if (!e.target.dataset.userIdx) return;
          if (!e.target.dataset.postIdx) return;
          if (!e.target.dataset.followed) return;
          if (!me) {
            return toast.warning("로그인을 해야 접근 가능한 기능입니다!");
          }

          // 팔로우/언팔로우를 위해 필요한 데이터들
          const userIdx = +e.target.dataset.userIdx;
          const postIdx = +e.target.dataset.postIdx;
          const isFollowed = JSON.parse(e.target.dataset.followed);

          // 언팔로우 요청
          if (isFollowed) mutateUnfollow({ userIdx, postIdx });
          // 팔로우 요청
          else mutateFollow({ userIdx, postIdx });
        }

        // 게시글 모달에 대한 처리
        if (type === "modal") {
          if (!e.target.dataset.isMine) return;
          if (!e.target.dataset.postIdx) return;
          if (!e.target.dataset.isBookmarked) return;

          // 모달을 열기 위해 필요한 데이터들
          const isMine = JSON.parse(e.target.dataset.isMine);
          const postIdx = +e.target.dataset.postIdx;
          const isBookmarked = JSON.parse(e.target.dataset.isBookmarked);

          openPostModal(isMine, postIdx, isBookmarked);
        }
      },
      [me, mutateFollow, mutateUnfollow, openPostModal]
    );

  return (
    <>
      <InfiniteScrollContainer
        hasMore={hasNextPage && !isFetching}
        fetchMore={fetchNextPage}
      >
        <StyledPost onClick={onClickBubblingHanlder}>
          {data?.pages?.map((page) =>
            page.posts?.map((post) => (
              <li key={post.idx}>
                <PostHeader
                  user={post.user}
                  postIdx={post.idx}
                  bookmarkers={post.bookMarkers}
                />
                <PostPhotos photos={splitPhotoURL(post.photos)} />
                <PostFooter
                  content={post.content}
                  postIdx={post.idx}
                  userIdx={post.userIdx}
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
      {isFetching || (
        <Title title={`** 더 이상 불러올 게시글이 없습니다! **`} />
      )}

      {postModalData.isOpen && <Modal.Post />}
      {postLikerModalData.isOpen && <Modal.PostLiker />}
      {commentLikerModalData.isOpen && <Modal.CommentLiker />}
    </>
  );
};

export default Post;
