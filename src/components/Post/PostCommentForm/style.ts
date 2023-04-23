import styled from "styled-components";

/** 2023/04/09 - 게시글의 댓글 작성 폼 스타일 - by 1-blue */
const StyledPostCommentForm = styled.form`
  display: flex;
  align-items: center;

  padding: 0 0.6em;

  & > * + * {
    margin-left: 0.6em;
  }

  /* 로그인한 유저 아바타 */
  & > figure {
    width: 2.4rem;
    height: 2.4rem;
  }

  /* 댓글 입력창 */
  & > textarea {
    flex: 1;

    padding: 0.6em;

    border: 2px solid transparent;
    background-color: transparent;

    color: ${({ theme }) => theme.colors.fg};

    resize: none;

    &:focus {
      outline: none;
      border-bottom: 2px solid ${({ theme }) => theme.colors.fg};
    }
    &::placeholder {
      font-weight: bold;
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }

  /* 댓글 생성 버튼 */
  & > button[type="submit"] {
    flex-basis: 36px;
  }
`;

export default StyledPostCommentForm;
