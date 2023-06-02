import { useCallback } from "react";
import Link from "next/link";

// component
import Avatar from "@src/components/common/Avatar";

// style
import StyledSuggestedUser from "./style";

// type
import type { SimpleUserWithName } from "@src/types/api";
import Icon from "@src/components/common/Icon";
interface Props {
  user: SimpleUserWithName;
  isRecent?: boolean;
}

/** 2023/06/01 - 유저 추천 검색어 - by 1-blue */
const SuggestedUser: React.FC<Props> = ({ user, isRecent }) => {
  /** 2023/06/01 - 최근 유저 검색어 등록 - by 1-blue */
  const onSave = useCallback(() => {
    const users = JSON.parse(
      localStorage.getItem("recentUsers") || "[]"
    ) as SimpleUserWithName[];

    if (!users.find((v) => v.idx === user.idx)) {
      localStorage.setItem("recentUsers", JSON.stringify([user, ...users]));
    }
  }, [user]);

  return (
    <StyledSuggestedUser>
      <Link href={`/${user.nickname}`} prefetch={false} onClick={onSave}>
        <Avatar src={user.avatar} alt={`${user.nickname}님의 아바타 이미지`} />
        <div>
          <span>{user.nickname}</span>
          <span>{user.name}</span>
        </div>
      </Link>

      {isRecent && (
        <button type="button" data-type="user" data-idx={user.idx}>
          <Icon shape="x-mark" color="#000" />
        </button>
      )}
    </StyledSuggestedUser>
  );
};

export default SuggestedUser;
