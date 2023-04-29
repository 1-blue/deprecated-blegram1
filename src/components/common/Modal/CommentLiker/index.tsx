import { useEffect, useRef } from "react";
import Link from "next/link";

// hook
import useCommentLikerModal from "@src/hooks/recoil/useCommentLikerModal";
import useCommentLikers from "@src/hooks/query/useCommentLikers";

// component
import InfiniteScrollContainer from "@src/components/common/InfiniteScrollContainer";
import Avatar from "@src/components/common/Avatar";
import Skeleton from "@src/components/common/Skeleton";

// style
import StyledModal from "./style";

/** 2023/04/28 - 좋아요 누른 사람들의 모달 ( 수정, 삭제, 북마크, 링크복사 ) - by 1-blue */
const CommentLiker = () => {
  /** 2023/04/28 - modal ref - by 1-blue */
  const modalRef = useRef<null | HTMLUListElement>(null);

  /** 2023/04/28 - 좋아요 누른 사람들의 모달관련 훅 - by 1-blue */
  const { commentLikerModalData, closeLikerModal } = useCommentLikerModal();

  /** 2023/04/28 - 게시글에 좋아요를 누른 유저들 불러오는 훅 - by 1-blue */
  const { data, fetchNextPage, hasNextPage, isLoading } = useCommentLikers({
    commentIdx: commentLikerModalData.commentIdx || -1,
    take: 20,
  });

  /** 2023/04/28 - 외부 클릭 시 모달 닫기 - by 1-blue */
  useEffect(() => {
    const modalCloseHandler = (e: MouseEvent) => {
      if (!commentLikerModalData.isOpen) return;
      if (!(e.target instanceof HTMLElement)) return;
      if (e.target instanceof HTMLButtonElement) return;
      if (!modalRef.current) return;
      if (modalRef.current.contains(e.target)) return;

      closeLikerModal();
    };

    window.addEventListener("click", modalCloseHandler);
    return () => window.removeEventListener("click", modalCloseHandler);
  }, [commentLikerModalData, closeLikerModal]);

  return (
    <StyledModal>
      {isLoading ? (
        <Skeleton.LikerModal />
      ) : (
        <ul ref={modalRef}>
          <InfiniteScrollContainer
            fetchMore={fetchNextPage}
            hasMore={hasNextPage}
          >
            {data?.pages.map((page) =>
              page.likers.map(({ commentLiker }) => (
                <li key={commentLiker.idx}>
                  <Avatar
                    src={commentLiker.avatar}
                    alt={`${commentLiker.nickname}님의 프로필 이미지`}
                    href={
                      `/${commentLiker.nickname}` as __next_route_internal_types__.RouteImpl<string>
                    }
                  />
                  <div>
                    <Link href={`/${commentLiker.nickname}`}>
                      {commentLiker.nickname}
                    </Link>
                    <span>{commentLiker.name}</span>
                  </div>
                  <button type="button">팔로우</button>
                </li>
              ))
            )}
          </InfiniteScrollContainer>
        </ul>
      )}
    </StyledModal>
  );
};

export default CommentLiker;
