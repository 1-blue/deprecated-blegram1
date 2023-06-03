import styled from "styled-components";

/** 2023/06/02 - 게시글 모달 스켈레톤 컴포넌트 스타일 - by 1-blue */
const StyledPostModal = styled.section`
  width: 100%;

  /* 공통 로직 */
  & div {
    border-radius: 0.2em;
    background-color: ${({ theme }) => theme.colors.gray500};
    -webkit-animation: ${({ theme }) => theme.animation.gradient} 1.8s infinite
      ease-in-out;
    animation: ${({ theme }) => theme.animation.gradient} 1.8s infinite
      ease-in-out;
  }

  padding-bottom: 0.6em;

  & > * {
    margin-top: 0.6em;
  }
  & + li {
    border-top: 1px solid ${({ theme }) => theme.colors.fg};
  }

  & > .header-wrapper {
    display: flex;
    align-items: center;

    & > * + * {
      margin-left: 0.6em;
    }

    & > div {
      &:nth-child(1) {
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 50%;
      }
      &:nth-child(2) {
        width: 2rem;
        height: 1rem;
        margin-right: auto;
      }
      &:nth-child(3) {
        width: 3rem;
        height: 1.6rem;
      }
      &:nth-child(4) {
        width: 1rem;
        height: 2rem;
      }
    }
  }
  & > .photos-wrapper {
    margin: 1em -1em;

    & > div {
      width: 100%;
      height: 400px;
      border-radius: 0;

      @media ${({ theme }) => theme.mediaSize.sm} {
        height: 320px;
      }
    }
  }
  & > .buttons-wrapper {
    display: flex;

    & > * + * {
      margin-left: 0.6em;
    }

    & > div {
      width: 1.8rem;
      height: 1.8rem;

      &:last-child {
        margin-left: auto;
      }
    }
  }
  & > .content-wrapper {
    & > * + * {
      margin-top: 0.4em;
    }

    & > div {
      height: 1rem;

      &:nth-child(1) {
        width: 80%;
      }
      &:nth-child(2) {
        width: 70%;
      }
      &:nth-child(3) {
        width: 60%;
      }
    }
  }
  & > .comment-wrapper {
    display: flex;
    align-items: center;

    & > * + * {
      margin-left: 0.6em;
    }

    & > div {
      &:nth-child(1) {
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 50%;
      }
      &:nth-child(2) {
        flex: 1;

        height: 1.4rem;
      }
      &:nth-child(3) {
        width: 1.6rem;
        height: 1.8rem;
      }
    }
  }
`;

export default StyledPostModal;
