import styled from "styled-components";

/** 2023/04/26 - 좋아요 누른 사람들 모달 스켈레톤 UI 스타일 - by 1-blue */
const StyledLikerModal = styled.ul`
  display: flex;
  height: 350px;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bg};
  border-bottom-right-radius: 0.4em;
  border-bottom-left-radius: 0.4em;

  @media ${({ theme }) => theme.mediaSize.md} {
    height: 320px;
  }

  & > li {
    flex: 1;
    min-width: 160px;
    width: 100%;
    height: 100%;
    padding: 0.6em;
    display: flex;
    align-items: center;

    & + li {
      padding-top: 0;
    }

    /* 공통 로직 */
    & div {
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
    /* 이름 */
    & > .name-wrapper {
      flex: 1;
      height: 100%;

      display: flex;
      flex-flow: column;

      & > * + * {
        margin-top: 0.2em;
      }

      & > div {
        height: 100%;
        border-radius: 0.4em;

        &:first-child {
          width: 80%;
        }
        &:last-child {
          width: 60%;
        }
      }
    }
    /* 팔로우 버튼 */
    & > .follow {
      width: 3rem;
      height: 1.6rem;
      border-radius: 0.2em;
    }
  }
`;

export default StyledLikerModal;
