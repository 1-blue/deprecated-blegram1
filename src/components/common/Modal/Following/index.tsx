import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

// hook
import useFollowingModal from "@src/hooks/recoil/useFollowingModal";
import { useFollow, useFollowings, useMe } from "@src/hooks/query";

// component
import InfiniteScrollContainer from "@src/components/common/InfiniteScrollContainer";
import Avatar from "@src/components/common/Avatar";
import Skeleton from "@src/components/common/Skeleton";

// style
import StyledModal from "./style";

/** 2023/05/13 - 팔로워들 모달 - by 1-blue */
const Following = () => {
  /** 2023/05/13 - modal ref - by 1-blue */
  const modalRef = useRef<null | HTMLUListElement>(null);

  /** 2023/05/13 - 특정 유저를 팔로잉하는 사람들 모달관련 훅 - by 1-blue */
  const { followingModalData, closeFollowingModal } = useFollowingModal();

  /** 2023/05/13 - 특정 유저를 팔로잉하는 사람들 불러오는 훅 - by 1-blue */
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useFollowings.useFetchFollowings({
      followingIdx: followingModalData.followingIdx || -1,
      take: 20,
      lastIdx: -1,
    });

  /** 2023/05/13 - 외부 클릭 시 모달 닫기 - by 1-blue */
  useEffect(() => {
    const modalCloseHandler = (e: MouseEvent) => {
      if (!followingModalData.isOpen) return;
      if (!(e.target instanceof HTMLElement)) return;
      if (e.target instanceof HTMLButtonElement) return;
      if (!modalRef.current) return;
      if (modalRef.current.contains(e.target)) return;

      closeFollowingModal();
    };

    window.addEventListener("click", modalCloseHandler);
    return () => window.removeEventListener("click", modalCloseHandler);
  }, [followingModalData, closeFollowingModal]);

  /** 2023/05/10 - 로그인한 유저의 정보 - by 1-blue */
  const { me } = useMe.useFetchMe({});

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
        if (!followingModalData.followingIdx) return;
        if (!followingModalData.nickname) return;
        if (!me) return toast.warning("로그인후에 접근해주세요!");

        // 팔로우/언팔로우를 위해 필요한 데이터들
        const userIdx = +e.target.dataset.userIdx;
        const { followingIdx, nickname } = followingModalData;
        const isFollowed = JSON.parse(e.target.dataset.followed);

        // 언팔로우 요청
        if (isFollowed) mutateUnfollow({ userIdx, followingIdx, nickname });
        // 팔로우 요청
        else mutateFollow({ userIdx, followingIdx, nickname });
      },
      [me, followingModalData, mutateFollow, mutateUnfollow]
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
              page.followings.map((following) => (
                <li key={following.idx}>
                  <Avatar
                    src={following.avatar}
                    alt={`${following.nickname}님의 프로필 이미지`}
                    href={
                      `/${following.nickname}` as __next_route_internal_types__.RouteImpl<string>
                    }
                  />
                  <div>
                    <Link href={`/${following.nickname}`}>
                      {following.nickname}
                    </Link>
                    <span>{following.name}</span>
                  </div>
                  {me && me.idx !== following.idx && (
                    <button
                      type="button"
                      className="follow"
                      data-user-idx={following.idx}
                      data-followed={following.followers.length > 0}
                    >
                      {following.followers.length > 0 ? "언팔로우" : "팔로우"}
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

export default Following;
