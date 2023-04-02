import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
`;

/** 2023/04/03 - 404 페이지 스타일 - by 1-blue */
const StyledNotFound = styled.article`
  margin-top: 10vh;

  & > * + * {
    margin-top: 2em;
  }

  & > .top {
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.colors.fg};
    font-size: 90px;

    & > svg {
      width: 70px;
      height: 70px;

      fill: ${({ theme }) => theme.colors.fg};
    }

    & > * + * {
      margin-left: 0.2em;
    }
  }

  & > .mid {
    & > h1 {
      font-size: 1.6rem;
      font-weight: bold;
      text-align: center;
      white-space: pre-line;
      line-height: 1.4;
    }
  }

  & > .bottom {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    & > svg {
      animation: ${bounce} 1s infinite;
    }

    & > a {
      margin: 0 auto;
      padding: 0.4em 0.6em;

      font-size: 1.4rem;
      font-weight: bolder;
      border: 3px solid ${({ theme }) => theme.colors.fg};
      border-radius: 0.1em;

      transition: all 0.4s;

      &:hover,
      &:focus {
        background-color: ${({ theme }) => theme.colors.fg};
        color: ${({ theme }) => theme.colors.bg};

        outline: none;
      }
    }
  }
`;

export default StyledNotFound;
