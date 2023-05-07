import styled from "styled-components";

/** 2023/04/09 - 게시글 컴포넌트 스타일 - by 1-blue */
const StyledPost = styled.ul`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  /* 게시글 */
  & > li {
    padding-bottom: 0.6em;

    & > * {
      margin-top: 0.6em;
    }

    & + li {
      border-top: 1px solid ${({ theme }) => theme.colors.fg};
    }
    &:last-child {
      border-bottom: 1px solid ${({ theme }) => theme.colors.fg};
    }
  }
`;

export default StyledPost;
