import styled from "styled-components";

/** 2023/05/05 - 추천 검색어 스타일 - by 1-blue */
const StyledSuggestedUser = styled.li`
  display: inline-flex;
  width: 100%;
  padding: 0.4em 0;
  transition: all 0.3s;

  &:hover {
    font-weight: bold;
    background-color: ${({ theme }) => theme.colors.gray300};
  }

  & > a {
    width: inherit;
    padding: 0.8em 1em;
    border-radius: 0.2em;

    transition: all 0.2s;
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
        &:first-child {
          font-size: 1rem;
          font-weight: 600;
          color: ${({ theme }) => theme.colors.gray800};
        }
        &:last-child {
          font-size: 0.8rem;
          margin-top: 0.5em;
          color: ${({ theme }) => theme.colors.gray400};
        }
      }
    }
  }

  /* 최근 검색어 제거 */
  & > button[type="button"] {
    margin-left: auto;

    padding: 0 1em;
  }
`;

export default StyledSuggestedUser;
