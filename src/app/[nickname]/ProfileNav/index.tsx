"use client";

// style
import StyledProfileNav, { StyledLink } from "./style";

// type
import type { ProfilePageType } from "@src/types";
interface Props {
  nickname: string;
  type: ProfilePageType;
}

/** 2023/05/26 - 프로필 네비게이션 바 - by 1-blue */
const ProfileNav: React.FC<Props> = ({ nickname, type }) => {
  return (
    <StyledProfileNav>
      <StyledLink
        selected={type === "written"}
        href={
          `/${nickname}?type=written` as __next_route_internal_types__.RouteImpl<string>
        }
      >
        게시글
      </StyledLink>
      <StyledLink
        selected={type === "bookmarked"}
        href={
          `/${nickname}?type=bookmarked` as __next_route_internal_types__.RouteImpl<string>
        }
      >
        북마크 누른 게시글
      </StyledLink>
      <StyledLink
        selected={type === "liked"}
        href={
          `/${nickname}?type=liked` as __next_route_internal_types__.RouteImpl<string>
        }
      >
        좋아요 누른 게시글
      </StyledLink>
    </StyledProfileNav>
  );
};

export default ProfileNav;
