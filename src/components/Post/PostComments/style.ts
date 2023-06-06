import styled from "styled-components";

/** 2023/04/09 - 게시글의 댓글들 스타일 - by 1-blue */
const StyledPostComments = styled.ul`
  padding: 0 0.6em;

  /* open/close | load more button  */
  & > section {
    margin-bottom: 0.4em;

    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;

    & > button[type="button"] {
      padding: 0.2em 0.6em;

      color: ${({ theme }) => theme.colors.gray500};

      &:hover {
        color: ${({ theme }) =>
          theme.isDark ? theme.colors.gray400 : theme.colors.gray600};
      }
    }
  }

  /* comment */
  & > ul {
    & > * + * {
      margin-top: 1em;
    }
  }
`;

export default StyledPostComments;
