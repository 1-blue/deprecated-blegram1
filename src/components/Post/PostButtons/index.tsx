// component
import Icon from "@src/components/common/Icon";

// style
import StyledPostButtons from "./style";

/** 2023/04/09 - 게시글 하단 버튼들 ( 좋아요, 댓글, 북마크 ) - by 1-blue */
const PostButtons = () => {
  return (
    <StyledPostButtons>
      <Icon shape="heart" color="#dc2626" />
      <Icon shape="chat-bubble-oval-left" />
      <Icon shape="bookmark" />
    </StyledPostButtons>
  );
};

export default PostButtons;
