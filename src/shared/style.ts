import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

/** 2023/03/23 - 전역 스타일 ( + reset css ) - by 1-blue */
export const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  a{
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
  body{
    line-height: 1;
    font-family: 'Noto Sans KR', sans-serif;

    color: ${({ theme }) => theme.colors.fg};
    background-color: ${({ theme }) => theme.colors.bg};
  }
  ol, ul, li{
    list-style: none;
  }
  button {
    border: 0;
    background: transparent;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }
  html {
    font-size: 16px;
    ${({ theme }) => theme.util.scroll}
  }

  /* react-slick dots customizing */
  .custom-dots {
    display: flex;
    text-align: center;
    margin-top: 1em;

    & > li {
      display: inline-block;
      margin: 0 6px;
      padding: 0;
      
      cursor: pointer;

      & > button {
        display: block;
        height: 8px;
        width: 8px;
        padding: 0;

        border: none;
        color: transparent;
        background: ${({ theme }) =>
          theme.isDark ? theme.colors.gray500 : theme.colors.gray400};
        border-radius: 50%;
        cursor: pointer;
      }
      
      &.slick-active > button {
        background: ${({ theme }) => theme.colors.fg};
      }
    }
  }

  @media ${({ theme }) => theme.mediaSize.md} {
    html {
      font-size: 14px;
    }
  }
`;
