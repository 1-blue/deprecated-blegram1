// hook
import { useMe } from "@src/hooks/query";
import usePostModal from "@src/hooks/recoil/usePostModal";

// component
import Icon from "@src/components/common/Icon";
import Avatar from "@src/components/common/Avatar";

// style
import StyledPostHeader from "./style";

// type
import type { PostWithData } from "@src/types/api";
interface Props {
  user: PostWithData["user"];
  postIdx: number;
}

/** 2023/04/09 - 게시글 상단부 ( 작성자, 팔로우버튼, 옵션버튼 ) - by 1-blue */
const PostHeader: React.FC<Props> = ({ user, postIdx }) => {
  const { me } = useMe.useFetchMe();

  /** 2023/04/11 - FIXME: 상위에서 버블링으로 처리하기 게시글의 모달관련 훅 - by 1-blue */
  const { openPostModal } = usePostModal();

  /** 2023/05/09 - 팔로우했는지 여부 - by 1-blue */
  const isFollowed = user.followings.length > 0;

  return (
    <StyledPostHeader>
      <Avatar
        src={user.avatar}
        alt={`${user.nickname}님의 프로필 이미지`}
        href={
          `/${user.nickname}` as __next_route_internal_types__.RouteImpl<string>
        }
      />
      <span>{user.nickname}</span>
      {me && me.idx !== user.idx && (
        <button
          type="button"
          className="follow"
          data-user-idx={user.idx}
          data-post-idx={postIdx}
          data-followed={isFollowed}
        >
          {isFollowed ? "언팔로우" : "팔로우"}
        </button>
      )}
      <button
        type="button"
        className="option"
        onClick={() => openPostModal(me?.idx === user.idx, postIdx)}
      >
        <Icon shape="ellipsis-vertical" />
      </button>
    </StyledPostHeader>
  );
};

export default PostHeader;
