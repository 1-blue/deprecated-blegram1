import styled from "styled-components";

/** 2023/05/26 - 프로필 페이지 게시글 스타일 컴포넌트 - by 1-blue */
const StyledPost = styled.li`
  position: relative;
  padding-top: 80%;

  & > svg {
    position: absolute;
    top: 0;
    right: 0;

    transform: translate3d(-20%, 20%, 0);
    z-index: 1;
  }

  & > a {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    opacity: 0;

    transition: all 0.3s;

    & > * + * {
      margin-top: 0.4em;
    }

    & > div {
      display: flex;
      align-items: center;

      & > span {
        font-size: 1.4rem;
        font-weight: bold;
        color: #fff;
      }

      & > * + * {
        margin-left: 0.6em;
      }
    }
  }

  &:hover > a {
    opacity: 1;
    background: rgba(0, 0, 0, 0.7);
  }
`;

export default StyledPost;
