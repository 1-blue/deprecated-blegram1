import styled from "styled-components";

/** 2023/04/09 - 게시글 이미지들 - by 1-blue */
const StyledPostPhotos = styled.figure`
  height: 400px;

  @media ${({ theme }) => theme.mediaSize.xs} {
    height: 320px;
  }
`;

export default StyledPostPhotos;
