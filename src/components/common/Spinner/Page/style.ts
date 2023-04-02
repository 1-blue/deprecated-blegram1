import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0.01;
  }
  to {
    opacity: 1;
  }
`;
const spin = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`;

/** 2023/04/02 - 페이지 전체를 가리는 스피너 컴포넌트 스타일 - by 1-blue */
const StyledPage = styled.aside`
  position: fixed;
  inset: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.6);

  z-index: 20;

  fill: ${({ theme }) => theme.colors.main500};

  perspective: 800px;
  animation: ${fadeIn} 0.6s;

  & > svg {
    animation: ${spin} 1.4s linear infinite;
  }
`;

export default StyledPage;
