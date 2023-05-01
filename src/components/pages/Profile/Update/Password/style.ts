import styled from "styled-components";

/** 2023/03/31 - 비밀번호 수정 페이지 스타일 - by 1-blue */
const StyledPasswordUpdateForm = styled.form`
  max-width: 468px;
  padding: 1em;
  margin: 10vh auto 0;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  & > * + * {
    margin-top: 0.4em;
  }

  /** 제목 */
  & > h1 {
    font-size: 2rem;
    font-weight: bold;

    margin-bottom: 1em;
  }
`;

export default StyledPasswordUpdateForm;
