import styled from "styled-components";

/** 2023/04/14 - 게시글 모달 스타일 - by 1-blue */
const StyledModal = styled.section`
  position: fixed;
  inset: 0;

  background-color: rgba(0, 0, 0, 0.7);

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${({ theme }) => theme.animation.fadeIn} 0.4s;

  & > div {
    min-width: 200px;
    max-width: 280px;
    width: 60vw;

    display: flex;
    flex-flow: column nowrap;

    color: #000;
    background-color: #fff;

    border-radius: 0.4em;

    overflow: hidden;

    & > * + * {
      border-top: 1px solid ${({ theme }) => theme.colors.gray400};
    }

    & > button[type="button"] {
      padding: 0.8em;

      display: flex;
      align-items: center;

      color: #000;
      font-size: 1.1rem;
      font-weight: bold;
      text-align: left;

      transition: all 0.3s;

      & > * + * {
        padding-left: 0.8em;
      }

      &:hover {
        color: #fff;
        background-color: ${({ theme }) => theme.colors.gray400};
      }
    }
  }
`;

export default StyledModal;
