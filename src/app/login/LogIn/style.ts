import styled from "styled-components";

/** 2023/03/26 - 로그인 Form 스타일 - by 1-blue */
const StyledLogInForm = styled.form`
  min-height: calc(100vh - 80px);
  max-width: 468px;
  padding: 0 1em;
  margin: 0 auto;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  & > * + * {
    margin-bottom: 1em;
  }

  & > h1 {
    font-size: 2rem;
    font-weight: bold;

    margin-bottom: 1em;
  }

  & > div {
    width: 100%;

    display: flex;
    justify-content: space-between;

    color: ${({ theme }) => theme.colors.fg};

    & > a:focus,
    & > a:hover {
      outline: none;
      text-decoration: underline;
      text-underline-offset: 4px;
    }
    & > a:first-child {
      font-size: 0.8rem;
    }
    & > a:last-child {
      font-size: 0.9rem;
    }
  }
`;

export default StyledLogInForm;
