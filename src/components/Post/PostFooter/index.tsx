import Link from "next/link";

// hook
import useMe from "@src/hooks/query/useMe";

// component
import PostButtons from "@src/components/Post/PostButtons";
import PostComments from "@src/components/Post/PostComments";
import PostContent from "@src/components/Post/PostContent";
import PostCommentForm from "@src/components/Post/PostCommentForm";

// style
import { StyledNotLoggedInText } from "./style";

// type
interface Props {
  postIdx: number;
  content: string;
}

/** 2023/04/09 - 게시글 하단부 ( 버튼들, 내용, 댓글, 댓글폼 ) - by 1-blue */
const PostFooter: React.FC<Props> = ({ content, postIdx }) => {
  const { me } = useMe();

  return (
    <>
      <PostButtons />
      <PostContent content={content} />
      <PostComments />
      {me ? (
        <PostCommentForm postIdx={postIdx} />
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
