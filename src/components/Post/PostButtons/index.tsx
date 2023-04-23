// component
import Icon from "@src/components/common/Icon";

// style
import StyledPostButtons from "./style";

// type
interface Props {
  isCommentFocus: boolean;
  commentTextareaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
}

/** 2023/04/09 - 게시글 하단 버튼들 ( 좋아요, 댓글, 북마크 ) - by 1-blue */
const PostButtons: React.FC<Props> = ({
  commentTextareaRef,
  isCommentFocus,
}) => {
  return (
    <StyledPostButtons>
      <button type="button">
        <Icon shape="heart" color="#dc2626" />
      </button>
      <button type="button" onClick={() => commentTextareaRef.current?.focus()}>
        <Icon shape="chat-bubble-oval-left" fill={isCommentFocus} />
      </button>
      <button type="button">
        <Icon shape="bookmark" />
      </button>
    </StyledPostButtons>
  );
};

export default PostButtons;
