import { useSearchParams } from "next/navigation";

// util
import { splitPhotoURL } from "@src/utils";

// hook
import usePosts from "@src/hooks/query/usePosts";
import useModalOfPost from "@src/hooks/recoil/useModalOfPost";

// component
import InfiniteScrollContainer from "@src/components/common/InfiniteScrollContainer";
import PostHeader from "@src/components/Post/PostHeader";
import PostPhotos from "@src/components/Post/PostPhotos";
import PostFooter from "@src/components/Post/PostFooter";
import Modal from "@src/components/common/Modal";

// style
import StyledPost from "./style";

/** 2023/04/09 - 게시글 컴포넌트 - by 1-blue */
const Post = () => {
  /** FIXME: 양방향 스크롤링으로 변경하기 */
  const searchParams = useSearchParams();
  const postIdx = searchParams?.get("postIdx");

  /** 2023/04/10 - 무한 스크롤링을 적용한 게시글들의 데이터 - by 1-blue */
  const { data, hasNextPage, fetchNextPage } = usePosts({
    take: 10,
    lastIdx: postIdx ? +postIdx : undefined,
  });

  /** 2023/04/11 - 게시글의 모달관련 훅 - by 1-blue */
  const { modalData } = useModalOfPost();

  return (
    <>
      <InfiniteScrollContainer hasMore={hasNextPage} fetchMore={fetchNextPage}>
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
                  likers={post.postLikers}
                />
              </li>
            ))
          )}
        </StyledPost>
      </InfiniteScrollContainer>

      {modalData.isOpen && <Modal.Post />}
    </>
  );
};

export default Post;
