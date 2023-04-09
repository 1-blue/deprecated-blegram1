// hook
import useMe from "@src/hooks/query/useMe";

// component
import Icon from "@src/components/common/Icon";
import Avatar from "@src/components/common/Avatar";

// style
import StyledPostHeader from "./style";

// type
import type { SimpleUser } from "@src/types/api";
interface Props {
  user: SimpleUser;
}

/** 2023/04/09 - 게시글 상단부 ( 작성자, 팔로우버튼, 옵션버튼 ) - by 1-blue */
const PostHeader: React.FC<Props> = ({ user }) => {
  const { me } = useMe();

  return (
    <StyledPostHeader>
      <Avatar src={user.avatar} alt={`${user.nickname}님의 프로필 이미지`} />
      <span>{user.nickname}</span>
      {me && <button type="button">팔로우</button>}
      <Icon shape="ellipsis-vertical" />
    </StyledPostHeader>
  );
};

export default PostHeader;
