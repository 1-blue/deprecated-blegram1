import styled from "styled-components";

// type
type StyledProps = {
  isUp: boolean;
  isBottom: boolean;
};
/** 2023/03/24 - ASide 컴포넌트의 스타일 - by 1-blue */
const ASideStyled = styled.aside<StyledProps>`
  position: fixed;
  right: 20px;
  bottom: 80px;

  z-index: 10;

  transform: translateY(${({ isUp }) => (isUp ? "100%" : "0%")});
  transform: translateY(${({ isBottom }) => isBottom && "0%"});
  transition: all 0.2s;
`;

export default ASideStyled;
