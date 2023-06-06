import styled from "styled-components";

/** 2023/05/26 - 해당 유저의 좋아요한 게시글들 컴포넌트 - by 1-blue */
const StyledLikedPosts = styled.ul`
  margin-top: 2em;

  display: grid;
  grid-template-columns: repeat(3, minmax(10%, auto));
  gap: 1em;

  @media ${({ theme }) => theme.mediaSize.md} {
    grid-template-columns: repeat(2, minmax(10%, auto));
  }
  @media ${({ theme }) => theme.mediaSize.sm} {
    grid-template-columns: repeat(1, minmax(10%, auto));
  }
`;

export default StyledLikedPosts;
