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
      margin-top: 0.6em;
    }

    & > li {
      display: flex;

      & > * + * {
        margin-left: 0.4em;
      }

      /* 댓글 작성자 아바타 */
      & > figure {
        width: 2.4rem;
        height: 2.4rem;
      }

      /* 댓글 작성자 및 내용 wrapper */
      & > div {
        & > * + * {
          margin-top: 0.4em;
        }

        /* 작성자와 작성시간 */
        & > div {
          font-size: 0.8rem;

          & > * + * {
            margin-left: 0.6em;
          }

          /* 작성 시간 */
          & > time {
            color: ${({ theme }) => theme.colors.gray400};
          }
        }

        /* 작성 내용 */
        & > p {
          white-space: pre-wrap;
          font-size: 0.9rem;
          line-height: 1.1;
        }
      }
    }
  }
`;

export default StyledPostComments;
