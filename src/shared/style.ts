import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

/** 2023/03/23 - 전역 스타일 ( + reset css ) - by 1-blue */
export const GlobalStyle = createGlobalStyle`
  /** reset */
  ${reset}
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
  a, dl, dt, dd, ol, ul, li, form, label, table{
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }
  ol, ul, li {
    list-style: none;
  }
  button {
    border: 0;
    background: transparent;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }

  /**
   * https://noonnu.cc/font_page/1127
   * https://company.lottemart.com/company/font_jamsil.asp
   */
  @font-face {
    font-family: "TheJamsil5";
    font-style: normal;
    font-weight: 100;
    src: url("/fonts/The Jamsil 1 Thin.ttf") format("woff2");
  }
  @font-face {
    font-family: "TheJamsil5";
    font-style: normal;
    font-weight: 300;
    src: url("/fonts/The Jamsil 2 Light.ttf") format("woff2");
  }
  @font-face {
    font-family: "TheJamsil5";
    font-style: normal;
    font-weight: 400;
    src: url("/fonts/The Jamsil 3 Regular.ttf") format("woff2");
  }
  @font-face {
    font-family: "TheJamsil5";
    font-style: normal;
    font-weight: 500;
    src: url("/fonts/The Jamsil 4 Medium.ttf") format("woff2");
  }
  @font-face {
    font-family: "TheJamsil5";
    font-style: normal;
    font-weight: 700;
    src: url("/fonts/The Jamsil 5 Bold.ttf") format("woff2");
  }
  @font-face {
    font-family: "TheJamsil5";
    font-style: normal;
    font-weight: 800;
    src: url("/fonts/The Jamsil 6 ExtraBold.ttf") format("woff2");
  }

  html {
    font-size: 16px;
    ${({ theme }) => theme.util.scroll}
  }
  body {
    line-height: 1;
    font-family: "TheJamsil5", "Noto Sans KR", sans-serif;

    color: ${({ theme }) => theme.colors.fg};
    background-color: ${({ theme }) => theme.colors.bg};
  }

  @media ${({ theme }) => theme.mediaSize.md} {
    html {
      font-size: 14px;
    }
  }
`;
