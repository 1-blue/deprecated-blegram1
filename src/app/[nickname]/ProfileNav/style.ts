import styled, { css } from "styled-components";

// type
import Link from "next/link";
interface StyledProps {
  selected: boolean;
}

/** 2023/03/29 - 프로필 네비게이션 스타일 - by 1-blue */
const StyledProfileNav = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-top: 3em;
`;

export const StyledLink = styled(Link)<StyledProps>`
  flex: 1;
  text-align: center;

  padding: 1em;

  ${({ selected }) =>
    selected &&
    css`
      border-bottom: 3px solid;
    `}
`;

export default StyledProfileNav;
