import styled from "styled-components";

/** 2023/03/23 - 테마 토글 버튼 스타일 - by 1-blue */
const ThemeToggleButton = styled.button`
  width: 50px;
  height: 50px;

  background: ${({ theme }) => theme.colors.fg};
  color: ${({ theme }) => theme.colors.bg};

  border-radius: 50%;
  box-shadow: 1px 1px 4px ${({ theme }) => theme.colors.fg};

  /** 반응형 적용 */
  @media ${({ theme }) => theme.mediaSize.md} {
    width: 40px;
    height: 40px;

    & > svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export default ThemeToggleButton;
