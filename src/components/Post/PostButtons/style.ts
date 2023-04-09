import styled from "styled-components";

/** 2023/04/09 - 게시글 하단 버튼들 스타일 - by 1-blue */
const StyledPostButtons = styled.ul`
  display: flex;
  padding: 0 0.6em;

  & > * + * {
    margin-left: 0.4em;
  }

  & > svg {
    &:last-child {
      margin-left: auto;
    }
  }
`;

export default StyledPostButtons;
