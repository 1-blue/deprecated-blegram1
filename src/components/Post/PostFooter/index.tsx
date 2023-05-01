import { useState } from "react";
import Link from "next/link";

// hook
import { useMe } from "@src/hooks/query";
import useResizeTextarea from "@src/hooks/useResizeTextarea";

// component
import PostButtons from "@src/components/Post/PostButtons";
import PostLikers from "@src/components/Post/PostLikers";
import PostComments from "@src/components/Post/PostComments";
import PostContent from "@src/components/Post/PostContent";
import PostCommentForm from "@src/components/Post/PostCommentForm";

// style
import { StyledNotLoggedInText } from "./style";

// type
import type { PostWithData } from "@src/types/api";
interface Props {
  postIdx: number;
  content: string;
  count: PostWithData["_count"];
  likers: PostWithData["postLikers"];
}

/** 2023/04/09 - 게시글 하단부 ( 버튼들, 내용, 댓글, 댓글폼 ) - by 1-blue */
const PostFooter: React.FC<Props> = ({ content, postIdx, count, likers }) => {
  const { me } = useMe.useFetchMe();

  /** 2023/04/24 - 댓글 입력창 포커싱 여부 - by 1-blue */
  const [isCommentFocus, setIsCommentFocus] = useState(false);

  /** 2023/04/18 - comment textarea 리사이즈 - by 1-blue */
  const [commentTextareaRef, handleCommentTextareaResizeHeight] =
    useResizeTextarea();

  /** 2023/04/25 - 로그인한 유저가 좋아요 눌렀는지 여부 - by 1-blue */
  const isLiked = !!likers.length;

  return (
    <>
      <PostButtons
        postIdx={postIdx}
        isLiked={isLiked}
        commentTextareaRef={commentTextareaRef}
        isCommentFocus={isCommentFocus}
      />
      {!!count.postLikers && (
        <PostLikers postIdx={postIdx} likerCount={count.postLikers} />
      )}
      <PostContent content={content} />
      <PostComments postIdx={postIdx} commentCount={count.comments} />
      {me ? (
        <PostCommentForm
          postIdx={postIdx}
          isCommentFocus={isCommentFocus}
          commentTextareaRef={commentTextareaRef}
          handleCommentTextareaResizeHeight={handleCommentTextareaResizeHeight}
          setIsCommentFocus={setIsCommentFocus}
        />
      ) : (
        <StyledNotLoggedInText>
          <span>
            <Link href="/login">로그인</Link>
            후에 댓글을 달 수 있습니다.
          </span>
        </StyledNotLoggedInText>
      )}
    </>
  );
};

export default PostFooter;
