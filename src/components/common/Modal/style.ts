import styled from "styled-components";

/** 2023/06/01 - 유저들 모달 스타일 ( 팔로우/좋아요한 사람들 리스트 모달 ) - by 1-blue */
const StyledModal = styled.section`
  position: fixed;
  inset: 0;
  z-index: 5;

  background-color: rgba(0, 0, 0, 0.7);

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${({ theme }) => theme.animation.fadeIn} 0.4s;

  & ul {
    min-width: 280px;
    max-width: 360px;
    width: 40vw;
    max-height: 60vh;
    overflow-y: auto;

    display: flex;
    flex-flow: column nowrap;

    color: #000;
    background-color: ${({ theme }) => theme.colors.fg};

    border-radius: 0.4em;

    ${({ theme }) => theme.util.scroll}

    & > li + li {
      border-top: 1px solid ${({ theme }) => theme.colors.gray400};
    }

    & > li {
      padding: 1em 1.2em;

      display: flex;

      & > * + * {
        margin-left: 0.6em;
      }

      /* 상단 제목 */
      &:first-child {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;

        color: ${({ theme }) => theme.colors.bg};

        & > * + * {
          margin-top: 1em;
          margin-left: 0;
        }

        & > h3 {
          font-size: 1.2rem;
        }

        & > div {
          padding: 1em;
          border: 5px dotted ${({ theme }) => theme.colors.bg};
          border-radius: 50%;
        }
      }

      /* 좋아요 누른 유저의 아바타 */
      & > figure {
        width: 3.2rem;
        height: 3.2rem;
      }
      /* 유저 닉네임/이름 */
      & > div {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;

        & > * + * {
          margin-top: 0.6em;
        }
        // 닉네임
        & > a {
          font-size: 1.1rem;
          font-weight: bold;
          color: ${({ theme }) => theme.colors.bg};
        }
        // 이름
        & > span {
          font-size: 0.9rem;
          color: ${({ theme }) => theme.colors.gray500};
        }
      }
      /* 팔로우 버튼 */
      & > button[type="button"] {
        margin-left: auto;
        padding: 0.6em 1em;
        border-radius: 0.4em;
        font-size: 0.9rem;

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
