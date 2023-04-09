// util
import { splitPhotoURL } from "@src/utils";

// hook
import usePosts from "@src/hooks/query/usePosts";

// component
import PostHeader from "@src/components/Post/PostHeader";
import PostPhotos from "@src/components/Post/PostPhotos";
import PostFooter from "@src/components/Post/PostFooter";

// style
import StyledPost from "./style";

/** 2023/04/09 - 게시글 컴포넌트 - by 1-blue */
const Post = () => {
  const { posts } = usePosts({ take: 5, lastIdx: -1 });

  return (
    <StyledPost>
      {posts?.map((post) => (
        <li key={post.idx}>
          <PostHeader user={post.user} />
          <PostPhotos photos={splitPhotoURL(post.photos)} />
          <PostFooter contents={post.contents} />
        </li>
      ))}
    </StyledPost>
  );
};

export default Post;
