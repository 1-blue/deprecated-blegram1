"use client";

import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

// util
import { splitPhotoURL } from "@src/utils";

// state
import usePostModal from "@src/hooks/recoil/usePostModal";

// hook
import useFetchPost from "@src/hooks/query/post/useFetchPost";
import { useFollow, useMe } from "@src/hooks/query";

// component
import PostHeader from "@src/components/Post/PostHeader";
import PostPhotos from "@src/components/Post/PostPhotos";
import PostFooter from "@src/components/Post/PostFooter";
import Skeleton from "@src/components/common/Skeleton";
import Icon from "@src/components/common/Icon";

// style
import StyledModal from "./style";

// type
interface Props {
  postIdx: number;
}

const SingleModal: React.FC<Props> = ({ postIdx }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { post, isLoading } = useFetchPost({ postIdx });

  /** 2023/04/11 - 게시글의 모달관련 훅 - by 1-blue */
  const { openPostModal } = usePostModal();

  /** 2023/05/09 - 로그인한 유저의 정보 - by 1-blue */
  const { me } = useMe.useFetchMe({});

  /** 2023/05/09 - 팔로우 요청 훅 - by 1-blue */
  const mutateFollow = useFollow.useCreateFollow();
  /** 2023/05/09 - 언팔로우 요청 훅 - by 1-blue */
  const mutateUnfollow = useFollow.useDeleteFollow();

  /** 2023/05/09 - 외부 클릭 시 닫기 || 팔로우/언팔로우 요청 || 전역 게시글 모달 열기 - by 1-blue */
  const onClickBubblingHanlder: React.MouseEventHandler<HTMLElement> =
    useCallback(
      (e) => {
        if (!pathname) return;
        if (!(e.target instanceof HTMLElement)) return;
        if (e.target.dataset.type === "outside") {
          if (pathname === "/post") return;

          router.push(
            pathname as __next_route_internal_types__.RouteImpl<string>
          );
        }

        if (!(e.target instanceof HTMLButtonElement)) return;
        if (!e.target.dataset.type) return;

        // "follow" or "modal" or "outside"
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
      [me, mutateFollow, mutateUnfollow, openPostModal, router, pathname]
    );

  /** 2023/06/01 - 게시글 없으면 이전 or 다음 게시글 패칭 - by 1-blue */
  useEffect(() => {
    if (isLoading) return;
    if (post) return;

    const dir = sessionStorage.getItem("dir");

    if (dir === "left") return router.replace(`/post/${postIdx - 1}`);

    return router.replace(`/post/${postIdx + 1}`);
  }, [isLoading, post, router, postIdx]);

  // 스켈레톤 UI
  if (isLoading || !post)
    return (
      <StyledModal>
        <article>
          <Skeleton.PostModal />
        </article>
      </StyledModal>
    );

  return (
    <StyledModal onClick={onClickBubblingHanlder} data-type="outside">
      <Link
        href={{ pathname, query: { postIdx: post.idx - 1 } }}
        onClick={(e) => {
          sessionStorage.setItem("dir", "left");
          if (post.idx - 1 > 0) return;

          toast.warning("게시글이 존재하지 않습니다.");
          e.preventDefault();
        }}
      >
        <Icon shape="chevron-left" color="#000" strokeWidth={2} />
      </Link>
      <article>
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
      </article>
      <Link
        href={{ pathname, query: { postIdx: post.idx + 1 } }}
        onClick={() => sessionStorage.setItem("dir", "right")}
      >
        <Icon shape="chevron-right" color="#000" strokeWidth={2} />
      </Link>
    </StyledModal>
  );
};

export default SingleModal;
