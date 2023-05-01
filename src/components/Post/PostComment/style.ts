import styled from "styled-components";

/** 2023/04/22 - 게시글의 댓글 컴포넌트 스타일 - by 1-blue */
const StyledPostComment = styled.li`
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
  & > .comment-wrapper {
    & > * + * {
      margin-top: 0.4em;
    }

    /* 작성자와 작성시간 수정/삭제 버튼 */
    & > div {
      font-size: 0.8rem;

      & > * + * {
        margin-left: 0.6em;
      }

      /* 작성 시간 */
      & > time {
        color: ${({ theme }) => theme.colors.gray400};
      }

      /* 수정 | 삭제 버튼 */
      & > button[type="button"] {
        color: ${({ theme }) => theme.colors.gray500};

        &:hover {
          font-weight: bold;
          color: ${({ theme }) =>
            theme.isDark ? theme.colors.gray400 : theme.colors.gray600};
        }
      }
    }

    /* 작성 내용 */
    & > textarea {
      padding: 0.4em;
      background-color: transparent;
      border: 0;

      color: ${({ theme }) => theme.colors.fg};

      font-size: 0.9rem;
      line-height: 1.2;
      resize: none;
      border: 2px solid ${({ theme }) => theme.colors.fg};

      ${({ theme }) => theme.util.noScroll};

      &:focus {
        outline: none;
      }
      &:disabled {
        border: 2px solid transparent;
      }
    }
  }

  /* 댓글 좋아요 버튼 */
  & > .comment-like-wrapper {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin-left: auto;

    & > button[type="button"]:last-child {
      padding: 0.2em;

      font-weight: 500;
      color: ${({ theme }) => theme.colors.fg};

      &:hover {
        font-weight: bold;
      }
    }
  }
`;

export default StyledPostComment;
