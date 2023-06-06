import styled from "styled-components";

/** 2023/06/02 - 특정 게시글 모달 컴포넌트 스타일 - by 1-blue */
const StyledModal = styled.aside`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  animation: ${({ theme }) => theme.animation.fadeIn} 0.6s;

  & > article {
    width: 80vw;
    max-width: 600px;
    min-width: 300px;
    min-height: 300px;
    max-height: 80vh;
    border-radius: 0.4em;

    background-color: ${({ theme }) => theme.colors.bg};

    overflow-y: auto;
    ${({ theme }) => theme.util.scroll}

    padding: 1em 1em;

    & > figure {
      margin: 1em -1em;
      height: 500px;
    }

    & > section:first-child {
      margin-top: 0 !important;
    }

    & > * + * {
      margin-top: 1em;
    }
  }

  & > a {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.6em;
    margin: 0 2em;
    background-color: #fff;
    border-radius: 50%;
  }

  @media ${({ theme }) => theme.mediaSize.md} {
    & > article > figure {
      height: 400px;
    }
  }

  @media ${({ theme }) => theme.mediaSize.sm} {
    & > article > figure {
      height: 60vw;
    }

    & > a {
      margin: 0 0.8em;
      padding: 0.3em;
    }
  }
`;

export default StyledModal;
