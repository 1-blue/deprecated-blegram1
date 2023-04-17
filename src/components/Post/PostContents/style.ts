import styled from "styled-components";

/** 2023/04/09 - 게시글의 내용 스타일 - by 1-blue */
const StyledPostContents = styled.section`
  display: flex;

  & > p {
    padding: 0 0.6em;

    white-space: pre-line;
    line-height: 1.2;
  }

  & > button[type="button"] {
    color: ${({ theme }) => theme.colors.bgGray};
  }
`;

export default StyledPostContents;
