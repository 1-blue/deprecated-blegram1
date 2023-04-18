import styled from "styled-components";

/** 2023/04/09 - 게시글 하단부 스타일 - by 1-blue */
const StyledNotLoggedInText = styled.section`
  display: flex;
  justify-content: center;

  & > span {
    font-size: 0.9rem;

    & > a {
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }
`;

export { StyledNotLoggedInText };
