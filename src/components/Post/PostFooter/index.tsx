// component
import PostButtons from "@src/components/Post/PostButtons";
import PostComments from "@src/components/Post/PostComments";
import PostContents from "@src/components/Post/PostContents";
import PostCommentForm from "@src/components/Post/PostCommentForm";

// type
interface Props {
  contents: string;
}

/** 2023/04/09 - 게시글 하단부 ( 버튼들, 내용, 댓글, 댓글폼 ) - by 1-blue */
const PostFooter: React.FC<Props> = ({ contents }) => {
  return (
    <>
      <PostButtons />
      <PostContents contents={contents} />
      <PostComments />
      <PostCommentForm />
    </>
  );
};

export default PostFooter;
