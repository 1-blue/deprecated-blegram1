import styled from "styled-components";

/** 2023/04/09 - 게시글 상단부 스타일 - by 1-blue */
const StyledPostHeader = styled.section`
  padding: 0 0.6em;

  display: flex;
  align-items: center;

  /* 아바타 */
  figure {
    width: 2.4rem;
    height: 2.4rem;

    margin-right: 0.6em;
  }

  /* 닉네임 */
  & > span {
    margin-right: auto;
  }

  /* 팔로우/언팔로우 */
  & > button[type="button"] {
    padding: 0.4em 0.8em;
    margin-right: 0.6em;

    border-radius: 0.2em;

    color: ${({ theme }) => theme.colors.bg};
    background-color: ${({ theme }) => theme.colors.fg};

    font-weight: bold;
    font-size: 0.85rem;
  }
`;

export default StyledPostHeader;
