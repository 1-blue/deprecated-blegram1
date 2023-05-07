"use client";

import { useEffect } from "react";

// util
import { splitPhotoURL } from "@src/utils";

// hook
import { useSearch } from "@src/hooks/query";
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
import StyledHashtagPosts from "./style";

// type
import type { ApiFetchHashtagPostsResponse } from "@src/types/api";
interface Props {
  hashtag: string;
  initialData: ApiFetchHashtagPostsResponse;
}

/** 2023/05/06 - 특정 해시태그에 해당하는 게시글들 렌더링 컴포넌트 - by 1-blue */
const Hashtag: React.FC<Props> = ({ hashtag, initialData }) => {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    useSearch.useFetchHashtagPosts({
      hashtag,
      take: 10,
      // FIXME: 이 값을 그대로 사용하면 좋아요/북마크 등 로그인 시 판단할 데이터를 제대로 판단하지 못함
      // initialData,
    });

  /** 2023/05/06 - 게시글의 모달관련 훅 - by 1-blue */
  const { postModalData } = usePostModal();
  /** 2023/05/06 - 게시글에 좋아요 누른 사람들 모달 훅 - by 1-blue */
  const { postLikerModalData } = usePostLikerModal();
  /** 2023/05/06 - 댓글에 좋아요 누른 사람들 모달 훅 - by 1-blue */
  const { commentLikerModalData } = useCommentLikerModal();

  /** 2023/05/06 - 외부 스크롤 금지 - by 1-blue */
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
        <StyledHashtagPosts>
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
        </StyledHashtagPosts>
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

export default Hashtag;
