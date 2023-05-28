import styled from "styled-components";

/** 2023/04/14 - 게시글 모달 스타일 - by 1-blue */
const StyledModal = styled.section`
  position: fixed;
  inset: 0;
  z-index: 2;

  background-color: rgba(0, 0, 0, 0.7);

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${({ theme }) => theme.animation.fadeIn} 0.4s;

  & ul {
    width: 280px;
    max-height: 60vh;
    overflow-y: auto;

    display: flex;
    flex-flow: column nowrap;

    color: #000;
    background-color: ${({ theme }) => theme.colors.fg};

    border-radius: 0.1em;

    ${({ theme }) => theme.util.scroll}

    & > li + li {
      border-top: 1px solid ${({ theme }) => theme.colors.gray400};
    }

    & > li {
      padding: 0.6em 0.8em;

      display: flex;

      & > * + * {
        margin-left: 0.6em;
      }

      /* 좋아요 누른 유저의 아바타 */
      & > figure {
        width: 2.4rem;
        height: 2.4rem;
      }
      /* 유저 닉네임/이름 */
      & > div {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;

        & > * + * {
          margin-top: 0.2em;
        }
        // 닉네임
        & > a {
          color: ${({ theme }) => theme.colors.bg};
        }
        // 이름
        & > span {
          font-size: 0.75rem;
          color: ${({ theme }) => theme.colors.gray500};
        }
        & > a,
        & > span {
          font-size: 0.8rem;
          font-weight: bold;
        }
      }
      /* 팔로우 버튼 */
      & > button[type="button"] {
        margin-left: auto;
        padding: 0.4em 1em;
        border-radius: 0.4em;

        align-self: center;

        font-weight: bold;

        color: #fff;
        background-color: ${({ theme }) => theme.colors.blue500};

        transition: all 0.2s;

        &:hover {
          background-color: ${({ theme }) => theme.colors.blue600};
        }
      }
    }
  }
`;

export default StyledModal;
