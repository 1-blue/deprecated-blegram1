import styled from "styled-components";

/** 2023/03/29 - 프로필 수정 페이지 스타일 - by 1-blue */
const StyledProfileUpdatePage = styled.form`
  min-height: calc(100vh - 80px);
  max-width: 468px;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  padding: 1em;
  margin: 0 auto;

  & > * + * {
    margin-top: 0.4em;
  }

  /* 비밀번호 수정 */
  & > a {
    align-self: flex-end;

    display: inline-block;

    font-size: 0.8rem;

    &:focus,
    &:hover {
      outline: none;
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }
`;

export default StyledProfileUpdatePage;
