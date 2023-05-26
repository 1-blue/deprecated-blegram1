"use client";

// hook
import useFetchWrittenPosts from "@src/hooks/query/posts/useFetchWrittenPosts";

// component
import InfiniteScrollContainer from "@src/components/common/InfiniteScrollContainer";
import Skeleton from "@src/components/common/Skeleton";
import Post from "../Post";

// style
import StyledWrittenPosts from "./style";

// type
interface Props {
  nickname: string;
}

/** 2023/05/26 - 해당 유저의 게시글들 컴포넌트 - by 1-blue */
const WrittenPosts: React.FC<Props> = ({ nickname }) => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useFetchWrittenPosts(
    { nickname, take: 20 }
  );

  return (
    <InfiniteScrollContainer fetchMore={fetchNextPage} hasMore={hasNextPage}>
      <StyledWrittenPosts>
        {data?.pages.map((page) =>
          page.posts?.map((post) => <Post key={post.idx} post={post} />)
        )}

        {isFetching && <Skeleton.Card />}
      </StyledWrittenPosts>
    </InfiniteScrollContainer>
  );
};

export default WrittenPosts;
