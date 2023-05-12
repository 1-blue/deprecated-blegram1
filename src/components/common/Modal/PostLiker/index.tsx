import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

// hook
import usePostLikerModal from "@src/hooks/recoil/usePostLikerModal";
import { useFollow, useLikers, useMe } from "@src/hooks/query";

// component
import InfiniteScrollContainer from "@src/components/common/InfiniteScrollContainer";
import Avatar from "@src/components/common/Avatar";
import Skeleton from "@src/components/common/Skeleton";

// style
import StyledModal from "./style";

/** 2023/04/25 - 게시글에 좋아요 누른 사람들의 모달 ( 수정, 삭제, 북마크, 링크복사 ) - by 1-blue */
const PostLiker = () => {
  /** 2023/04/25 - modal ref - by 1-blue */
  const modalRef = useRef<null | HTMLUListElement>(null);

  /** 2023/04/25 - 게시글에 좋아요 누른 사람들의 모달관련 훅 - by 1-blue */
  const { postLikerModalData, closeLikerModal } = usePostLikerModal();

  /** 2023/04/25 - 게시글에 좋아요를 누른 유저들 불러오는 훅 - by 1-blue */
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useLikers.usePostLikers({
      postIdx: postLikerModalData.postIdx || -1,
      take: 20,
    });

  /** 2023/04/25 - 외부 클릭 시 모달 닫기 - by 1-blue */
  useEffect(() => {
    const modalCloseHandler = (e: MouseEvent) => {
      if (!postLikerModalData.isOpen) return;
      if (!(e.target instanceof HTMLElement)) return;
      if (e.target instanceof HTMLButtonElement) return;
      if (!modalRef.current) return;
      if (modalRef.current.contains(e.target)) return;

      closeLikerModal();
    };

    window.addEventListener("click", modalCloseHandler);
    return () => window.removeEventListener("click", modalCloseHandler);
  }, [postLikerModalData, closeLikerModal]);

  /** 2023/05/10 - 로그인한 유저의 정보 - by 1-blue */
  const { me } = useMe.useFetchMe();

  /** 2023/05/10 - 팔로우 요청 훅 - by 1-blue */
  const mutateFollow = useFollow.useCreateFollow();
  /** 2023/05/10 - 언팔로우 요청 훅 - by 1-blue */
  const mutateUnfollow = useFollow.useDeleteFollow();

  /** 2023/05/10 - 팔로우/언팔로우 요청 - by 1-blue */
  const onFollowOrUnfollow: React.MouseEventHandler<HTMLUListElement> =
    useCallback(
      (e) => {
        if (!(e.target instanceof HTMLButtonElement)) return;
        if (!e.target.dataset.userIdx) return;
        if (!e.target.dataset.followed) return;
        if (!postLikerModalData.postIdx) return;
        if (!me) return toast.warning("로그인후에 접근해주세요!");

        // 팔로우/언팔로우를 위해 필요한 데이터들
        const userIdx = +e.target.dataset.userIdx;
        const { postIdx } = postLikerModalData;
        const isFollowed = JSON.parse(e.target.dataset.followed);

        // 언팔로우 요청
        if (isFollowed) mutateUnfollow({ userIdx, postIdx });
        // 팔로우 요청
        else mutateFollow({ userIdx, postIdx });
      },
      [me, postLikerModalData, mutateFollow, mutateUnfollow]
    );

  return (
    <StyledModal>
      {isLoading ? (
        <Skeleton.LikerModal />
      ) : (
        <ul ref={modalRef} onClick={onFollowOrUnfollow}>
          <InfiniteScrollContainer
            fetchMore={fetchNextPage}
            hasMore={hasNextPage}
          >
            {data?.pages.map((page) =>
              page.likers.map(({ postLiker }) => (
                <li key={postLiker.idx}>
                  <Avatar
                    src={postLiker.avatar}
                    alt={`${postLiker.nickname}님의 프로필 이미지`}
                    href={
                      `/${postLiker.nickname}` as __next_route_internal_types__.RouteImpl<string>
                    }
                  />
                  <div>
                    <Link href={`/${postLiker.nickname}`}>
                      {postLiker.nickname}
                    </Link>
                    <span>{postLiker.name}</span>
                  </div>
                  {me && me.idx !== postLiker.idx && (
                    <button
                      type="button"
                      className="follow"
                      data-user-idx={postLiker.idx}
                      data-followed={postLiker.followings.length > 0}
                    >
                      {postLiker.followings.length > 0 ? "언팔로우" : "팔로우"}
                    </button>
                  )}
                </li>
              ))
            )}
          </InfiniteScrollContainer>
        </ul>
      )}
    </StyledModal>
  );
};

export default PostLiker;
