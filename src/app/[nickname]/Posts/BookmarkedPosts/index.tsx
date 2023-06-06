"use client";

// hook
import useFetchBookmarkedPosts from "@src/hooks/query/posts/useFetchBookmarkedPosts";

// component
import InfiniteScrollContainer from "@src/components/common/InfiniteScrollContainer";
import Skeleton from "@src/components/common/Skeleton";
import Post from "../Post";

// style
import StyledBookmarkedPosts from "./style";

// type
interface Props {
  nickname: string;
}

/** 2023/05/26 - 해당 유저의 북마크한 게시글들 컴포넌트 - by 1-blue */
const BookmarkedPosts: React.FC<Props> = ({ nickname }) => {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useFetchBookmarkedPosts({ nickname, take: 20 });

  return (
    <InfiniteScrollContainer fetchMore={fetchNextPage} hasMore={hasNextPage}>
      <StyledBookmarkedPosts>
        {data?.pages.map((page) =>
          page.posts?.map((post) => <Post key={post.idx} post={post} />)
        )}

        {isFetching && <Skeleton.Card />}
      </StyledBookmarkedPosts>

      {data?.pages[0].posts?.length === 0 && (
        <span
          style={{
            display: "inline-block",
            width: "100%",
            textAlign: "center",
            fontSize: "1.5rem",
            margin: "3em 0",
          }}
        >
          북마크한 게시글이 없습니다.
        </span>
      )}
    </InfiniteScrollContainer>
  );
};

export default BookmarkedPosts;
