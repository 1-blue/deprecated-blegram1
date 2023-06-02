import styled, { css } from "styled-components";

// type
type StyledProps = {
  isUp: boolean;
  isBottom: boolean;
};
/** 2023/03/24 - 하단 네비게이션 바 스타일 컴포넌트 - by 1-blue */
const StyledNavBar = styled.nav<StyledProps>`
  position: fixed;
  inset: 0;
  top: auto;
  z-index: 1;

  max-width: 1024px;
  width: 100%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;

  color: ${({ theme }) => theme.colors.bg};
  background-color: ${({ theme }) => theme.colors.fg};

  border-top: 2px solid ${({ theme }) => theme.colors.gray400};

  transform: translateY(${({ isUp }) => (isUp ? "100%" : "0%")});
  transform: translateY(${({ isBottom }) => isBottom && "0%"});
  transition: all 0.2s;
`;

// type
type StyledLinkProps = {
  isCurrentPath: boolean;
};
/** 2023/03/24 - 하단 네비게이션 바의 "Link" 스타일 컴포넌트 - by 1-blue */
const StyledLink = styled.a<StyledLinkProps>`
  flex: 1;

  padding: 0.6em 0;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  text-align: center;

  cursor: pointer;

  &:hover span {
    font-weight: bold;
  }

  /** 네비게이션 바 텍스트 */
  & > span {
    font-weight: 400;
    margin-top: 0.4em;
  }

  /** 현재 경로와 일치할 경우 강조 표시 */
  &,
  & > svg {
    ${({ isCurrentPath }) =>
      isCurrentPath &&
      css`
        & > span {
          font-weight: bold;
        }
        color: ${({ theme }) =>
          theme.isDark ? theme.colors.main600 : theme.colors.main400};
      `};
  }

  /** 네비게이션 바 구분선 */
  /* & + a {
      border-left: 2px solid ${({ theme }) => theme.colors.fg};
    } */
`;

export default StyledNavBar;

export { StyledLink };
