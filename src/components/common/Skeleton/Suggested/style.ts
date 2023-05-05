import styled from "styled-components";

/** 2023/05/05 - 검색어 자동완성 스켈레톤 UI 컴포넌트 스타일 - by 1-blue */
const StyledSuggested = styled.article`
  padding: 0.6em 0.4em;
  margin-top: 0.1em;

  border-bottom-left-radius: 0.2em;
  border-bottom-right-radius: 0.2em;

  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.bgGray};

  background-color: #fff;

  /* 공통 로직 */
  & div {
    border-radius: 0.2em;
    background-color: ${({ theme }) => theme.colors.gray500};
    -webkit-animation: ${({ theme }) => theme.animation.gradient} 1.8s infinite
      ease-in-out;
    animation: ${({ theme }) => theme.animation.gradient} 1.8s infinite
      ease-in-out;
  }

  & > * + * {
    border-top: 2px solid ${({ theme }) => theme.colors.gray300};
  }

  & > section {
    display: flex;
    align-items: center;
    padding: 0.6em 0.8em;

    & > div {
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 50%;
    }

    & > section {
      margin-left: 0.4em;

      & > * + * {
        margin-top: 0.2em;
      }
      & > div {
        width: 100px;
        height: 12px;
        border-radius: 0.2em;

        &:last-child {
          width: 80%;
        }
      }
    }
  }
`;

export default StyledSuggested;
