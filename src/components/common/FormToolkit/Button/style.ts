import styled from "styled-components";

/** 2023/03/25 - 버튼 컴포넌트 스타일 - by 1-blue */
const StyledButton = styled.button`
  width: 100%;
  padding: 8px 12px;

  font-size: 1.2rem;
  font-weight: bold;

  border: 2px solid ${({ theme }) => theme.colors.fg};
  border-radius: 4px;

  color: ${({ theme }) => theme.colors.fg};
  background-color: ${({ theme }) => theme.colors.bg};

  transition: all 0.2s;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.bg};
    background-color: ${({ theme }) => theme.colors.fg};
  }
  &:focus {
    outline: none;
  }
`;

export default StyledButton;
