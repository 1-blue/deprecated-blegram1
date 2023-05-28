import styled from "styled-components";

/** 2023/05/26 - 프로필 페이지 게시글 카드 스켈레톤 스타일 컴포넌트 - by 1-blue */
const StyledCard = styled.li`
  & div {
    border-radius: 0.2em;
    background-color: ${({ theme }) => theme.colors.gray500};
    -webkit-animation: ${({ theme }) => theme.animation.gradient} 1.8s infinite
      ease-in-out;
    animation: ${({ theme }) => theme.animation.gradient} 1.8s infinite
      ease-in-out;
  }

  & div {
    padding-top: 80%;
  }
`;

export default StyledCard;
