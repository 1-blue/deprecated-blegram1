import styled from "styled-components";

/** 2023/04/29 - 댓글 스켈레톤 컴포넌트 스타일 - by 1-blue */
const StyledComment = styled.ul`
  display: flex;
  height: 350px;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bg};
  border-bottom-right-radius: 0.4em;
  border-bottom-left-radius: 0.4em;
  margin-top: 0.6em;

  @media ${({ theme }) => theme.mediaSize.md} {
    height: 320px;
  }

  & > li {
    flex: 1;
    min-width: 160px;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;

    & + li {
      padding-top: 0;
    }

    /* 공통 로직 */
    & div {
      border-radius: 0.2em;
      background-color: ${({ theme }) => theme.colors.gray500};
      -webkit-animation: ${({ theme }) => theme.animation.gradient} 1.8s
        infinite ease-in-out;
      animation: ${({ theme }) => theme.animation.gradient} 1.8s infinite
        ease-in-out;
    }

    /* 아바타 */
    & > .avatar {
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 50%;
      margin-right: 0.4em;
    }

    /* 중간 */
    & > .mid-wrapper {
      flex: 1;
      display: flex;
      flex-flow: column nowrap;

      /* 이름, 시간, 수정/삭제 버튼 */
      & > .top-wrapper {
        display: flex;

        & > * + * {
          margin-left: 0.4em;
        }

        & > div {
          width: 2rem;
          height: 1rem;
        }
      }

      /* 내용 */
      & > .content-wrapper {
        & > div {
          margin-top: 0.4em;

          height: 1rem;

          &:nth-child(1) {
            width: 80%;
          }
          &:nth-child(2) {
            width: 60%;
          }
          &:nth-child(3) {
            width: 50%;
          }
        }
      }
    }

    /* 우측 */
    & > .right-wrapper {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      align-self: flex-start;

      & > * + * {
        margin-top: 0.4em;
      }

      & > div {
        &:first-child {
          width: 1.4rem;
          height: 1.4rem;
        }
        &:last-child {
          width: 1rem;
          height: 1rem;
        }
      }
    }
  }
`;

export default StyledComment;
