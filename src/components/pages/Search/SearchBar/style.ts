import styled from "styled-components";

/** 2023/05/04 - 검색창 컴포넌트 스타일 - by 1-blue */
const StyledSearchBar = styled.section`
  display: flex;
  justify-content: center;

  margin-top: 10vh;

  & > form {
    display: flex;

    box-shadow: 0 0 4px ${({ theme }) => theme.colors.fg};

    border-radius: 0.2em;
    overflow: hidden;

    & > input {
      padding: 0.4em 0.6em;

      font-size: 1.2rem;

      border: 0;

      &:focus {
        outline: none;
      }
    }

    & > button {
      width: 2.4rem;
      height: 100%;

      background-color: ${({ theme }) => theme.colors.main500};

      transition: all 0.2s;

      &:hover {
        background-color: ${({ theme }) => theme.colors.main600};
      }
    }
  }
`;

export default StyledSearchBar;
