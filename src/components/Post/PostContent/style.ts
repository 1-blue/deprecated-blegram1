import styled from "styled-components";

/** 2023/04/09 - 게시글의 내용 스타일 - by 1-blue */
const StyledPostContent = styled.section`
  display: flex;

  & > p {
    padding: 0 0.6em;

    white-space: pre-line;
    line-height: 1.2;

    & > a {
      color: ${({ theme }) => theme.colors.main500};

      &:hover {
        font-weight: bold;
      }
    }
  }

  & > button[type="button"] {
    color: ${({ theme }) => theme.colors.bgGray};
  }
`;

export default StyledPostContent;
