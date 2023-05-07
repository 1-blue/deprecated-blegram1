import styled from "styled-components";

/** 2023/05/05 - 검색창 스타일 - by 1-blue */
const StyledSearchFromWrapper = styled.article`
  max-width: 300px;
  width: 50vw;
  min-width: 200px;

  margin: 0 auto;

  display: flex;
  flex-flow: column nowrap;
`;

/** 2023/05/04 - 검색창 스타일 - by 1-blue */
export const StyledSearchBar = styled.section`
  flex: 1;
  margin-top: 10vh;

  display: flex;
  justify-content: center;

  & > form {
    flex: 1;
    display: flex;

    box-shadow: 0 0 4px ${({ theme }) => theme.colors.fg};

    border-radius: 0.2em;
    overflow: hidden;

    & > input {
      width: 0%;
      flex: 1;
      padding: 0.4em 0.6em;

      font-size: 1.2rem;

      border: 0;
      border-top-left-radius: 0.2em;
      border-bottom-left-radius: 0.2em;

      &:focus {
        outline: none;
      }
    }

    & > button {
      flex-shrink: 0;
      width: 2.4rem;
      height: 100%;

      border-top-right-radius: 0.2em;
      border-bottom-right-radius: 0.2em;

      background-color: ${({ theme }) => theme.colors.main500};

      transition: all 0.2s;

      &:hover {
        background-color: ${({ theme }) => theme.colors.main600};
      }
    }
  }
`;

/** 2023/05/05 - 추천 검색어 스타일 - by 1-blue */
export const StyledSuggestedList = styled.ul`
  max-height: 40vh;
  margin-top: 0.1em;
  padding: 0.6em 0.4em;

  display: flex;
  flex-flow: column nowrap;

  border-bottom-left-radius: 0.2em;
  border-bottom-right-radius: 0.2em;

  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.bgGray};

  background-color: #fff;

  overflow-y: auto;

  ${({ theme }) => theme.util.scroll};

  & > * + * {
    border-top: 2px solid ${({ theme }) => theme.colors.gray300};
  }

  & > li {
    display: inline-flex;
    width: 100%;

    & > a {
      width: inherit;
      padding: 0.6em 0.8em;

      border-radius: 0.2em;

      transition: all 0.2s;

      &:hover {
        font-weight: bold;
      }

      &:hover {
        background-color: ${({ theme }) => theme.colors.gray300};
      }
    }

    & > a {
      display: flex;
      color: #000;

      /* 아바타 */
      & > figure {
        width: 2.4rem;
        height: 2.4rem;
      }

      /* 닉네임과 이름 */
      & > div {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;

        margin-left: 0.4em;

        & > span {
          font-size: 0.9rem;

          &:first-child {
            font-weight: bold;
            color: ${({ theme }) => theme.colors.gray800};
          }
          &:last-child {
            margin-top: 0.2em;
            color: ${({ theme }) => theme.colors.gray400};
          }
        }
      }
    }
  }
`;

/** 2023/05/06 - 추천 검색어가 없는 스타일 - by 1-blue */
export const StyledNotSuggested = styled.section`
  margin-top: 0.1em;
  padding: 2em;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  width: 100%;

  background-color: #fff;
  color: ${({ theme }) => theme.colors.gray500};
  border-bottom-left-radius: 0.2em;
  border-bottom-right-radius: 0.2em;

  box-shadow: 0 0 4px ${({ theme }) => theme.colors.fg};

  & > span {
    margin-top: 0.4em;
    font-size: 0.9rem;
    font-weight: bold;
  }
  & > p {
    margin-top: 0.8em;
    font-size: 0.7rem;
    line-height: 1.2;
  }
`;

export default StyledSearchFromWrapper;
