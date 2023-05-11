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
  & > a {
    margin-right: auto;
  }

  /* 팔로우/언팔로우 */
  & > .follow {
    padding: 0.4em 0.8em;
    margin-right: 0.6em;

    border-radius: 0.2em;

    font-size: 0.8rem;

    color: #fff;
    background-color: ${({ theme }) => theme.colors.blue500};

    transition: all 0.2s;

    &:hover {
      font-weight: bold;
      background-color: ${({ theme }) => theme.colors.blue600};
    }
  }
`;

export default StyledPostHeader;
