import styled from "styled-components";

/** 2023/05/05 - 추천 검색어 스타일 - by 1-blue */
const StyledSuggestedHashtag = styled.li`
  display: inline-flex;
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray300};
    font-weight: bold;
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

  /* 최근 검색어 제거 */
  & > button[type="button"] {
    margin-left: auto;

    padding: 0 1em;
  }
`;

export default StyledSuggestedHashtag;
