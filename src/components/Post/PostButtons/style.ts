import styled from "styled-components";

/** 2023/04/09 - 게시글 하단 버튼들 스타일 - by 1-blue */
const StyledPostButtons = styled.ul`
  display: flex;
  padding: 0 0.6em;

  /* 이게 없으면 대체 왜 아이콘 <path>를 인지를 못할까요...? */
  transform: translateY(0%);

  & > * + * {
    margin-left: 0.4em;
  }

  & > button[type="button"] {
    &:last-child {
      margin-left: auto;
    }
  }
`;

export default StyledPostButtons;
