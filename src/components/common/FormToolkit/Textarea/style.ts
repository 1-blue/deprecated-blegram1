import styled from "styled-components";

/** 2023/03/25 - Textarea 컴포넌트 스타일 - by 1-blue */
const StyledTextarea = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  & > label {
    font-size: 0.8rem;
    color: gray;
    align-self: flex-start;
    cursor: pointer;
    margin-bottom: 0.4em;
  }
  & > textarea {
    width: 100%;
    font-size: 1rem;
    padding: 8px 12px;
    border: 2px solid ${({ theme }) => theme.colors.fg};
    border-radius: 4px;

    color: ${({ theme }) => theme.colors.fg};
    background-color: ${({ theme }) => theme.colors.bg};

    resize: none;

    ${({ theme }) => theme.util.scroll}

    &:focus {
      outline: none;

      border: 2px solid
        ${({ theme }) =>
          theme.isDark ? theme.colors.main400 : theme.colors.main600};
    }

    &::placeholder {
      font-size: 0.8rem;
      font-weight: bold;
    }
  }
  & > span {
    margin-top: 0.6em;
    font-size: 0.7rem;
    color: ${({ theme }) =>
      theme.isDark ? theme.colors.red400 : theme.colors.red600};
    align-self: flex-start;
  }
`;

export default StyledTextarea;
