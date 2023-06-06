"use client";

import Link from "next/link";
import styled from "styled-components";

// component
import Icon from "@src/components/common/Icon";

/** 2023/04/30 - Error 페이지 스타일 - by 1-blue */
const StyledErrorPage = styled.article`
  margin-top: 10vh;

  & > * + * {
    margin-top: 2em;
  }

  & > .top {
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.colors.fg};
    font-size: 4.8rem;

    & > svg {
      width: 3.4rem;
      height: 3.4rem;

      fill: ${({ theme }) => theme.colors.fg};
    }

    & > * + * {
      margin-left: 0.1em;
    }
  }

  & > .mid {
    & > * + * {
      margin-top: 1em;
    }

    & > h1 {
      font-size: 1.6rem;
      font-weight: bold;
      text-align: center;
      white-space: pre-line;
      line-height: 1.4;
    }

    & > p {
      font-size: 1.2rem;
      text-align: center;
    }
  }

  & > .bottom {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    & > svg {
      animation: ${({ theme }) => theme.animation.bounce} 1s infinite;
    }

    & > a,
    & > button {
      margin: 0.4em auto;
      padding: 0.4em 0.6em;

      font-size: 1.4rem;
      font-weight: bolder;
      border: 3px solid ${({ theme }) => theme.colors.fg};
      border-radius: 0.1em;
      color: ${({ theme }) => theme.colors.fg};

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

// type
interface Props {
  error: Error;
  reset: () => void;
}

/** 2023/04/30 - Erorr 페이지 - by 1-blue */
const Error: React.FC<Props> = ({ error, reset }) => {
  return (
    <StyledErrorPage>
      <section className="top">
        <span>E</span>
        <span>R</span>
        <span>R</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 40 40"
          xmlSpace="preserve"
        >
          <path d="M14.8,5.1L8.8,33C5.8,29.9,4,25.5,4,21C4,13.6,8.5,7.3,14.8,5.1 M20,0C9,0,0,9.4,0,21c0,8.4,4.7,15.5,11.4,19L20,0L20,0z" />
          <path d="M25.2,5.1C31.5,7.3,36,13.6,36,21c0,4.5-1.8,8.9-4.8,12L25.2,5.1 M20,0l8.6,40C35.3,36.5,40,29.4,40,21C40,9.4,31,0,20,0L20,0z" />
        </svg>
        <span>R</span>
      </section>
      <section className="mid">
        <h1>{"문제가 발생했습니다.\n잠시후에 다시 시도해주세요!"}</h1>
        <p>( {error?.message} )</p>
      </section>
      <section className="bottom">
        <Icon shape="chevron-double-down" size="2xl" />
        <button type="button" onClick={reset}>
          새로고침
        </button>
        <Link href="/">메인 페이지로 이동</Link>
      </section>
    </StyledErrorPage>
  );
};

export default Error;
