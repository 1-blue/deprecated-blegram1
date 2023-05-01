import styled from "styled-components";

/** 2023/04/25 - 게시글에 좋아요 누른 사람들 스타일 - by 1-blue */
const StyledPostLikers = styled.button`
  padding: 0 0.6em;

  color: ${({ theme }) => theme.colors.fg};
`;

export default StyledPostLikers;
