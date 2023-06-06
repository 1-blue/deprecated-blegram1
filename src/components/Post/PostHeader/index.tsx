import Link from "next/link";

// hook
import { useMe } from "@src/hooks/query";

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
  bookmarkers: PostWithData["bookMarkers"];
}

/** 2023/04/09 - 게시글 상단부 ( 작성자, 팔로우버튼, 옵션버튼 ) - by 1-blue */
const PostHeader: React.FC<Props> = ({ user, postIdx, bookmarkers }) => {
  const { me } = useMe.useFetchMe({});

  /** 2023/05/09 - 팔로우했는지 여부 - by 1-blue */
  const isFollowed = user.followers.length > 0;

  /** 2023/05/11 - 로그인한 유저가 북마크 눌렀는지 여부 - by 1-blue */
  const isBookmarked = !!bookmarkers.length;

  return (
    <StyledPostHeader>
      <Avatar
        src={user.avatar}
        alt={`${user.nickname}님의 프로필 이미지`}
        href={
          `/${encodeURI(
            user.nickname
          )}` as __next_route_internal_types__.RouteImpl<string>
        }
      />
      <Link href={`/${encodeURI(user.nickname)}`}>
        <span>{user.nickname}</span>
      </Link>
      {me && me.idx !== user.idx && (
        <button
          type="button"
          className="follow"
          data-type="follow"
          data-user-idx={user.idx}
          data-post-idx={postIdx}
          data-followed={isFollowed}
        >
          {isFollowed ? "언팔로우" : "팔로우"}
        </button>
      )}
      <button
        type="button"
        data-type="modal"
        data-is-mine={me?.idx === user.idx}
        data-post-idx={postIdx}
        data-is-bookmarked={isBookmarked}
      >
        <Icon shape="ellipsis-vertical" />
      </button>
    </StyledPostHeader>
  );
};

export default PostHeader;
