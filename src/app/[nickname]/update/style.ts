import styled from "styled-components";

/** 2023/03/29 - 프로필 수정 페이지 스타일 - by 1-blue */
const StyledProfileUpdatePage = styled.form`
  min-height: calc(100vh - 80px);
  max-width: 468px;

  padding: 1em;
  margin: 0 auto;

  & > * + * {
    margin-top: 0.4em;
  }

  /* 아바타 */
  & > .avatar {
    margin: 0 auto;

    width: 160px;
    height: 160px;

    background-color: ${({ theme }) => theme.colors.indigo500};
    border-radius: 50%;
  }
`;

export default StyledProfileUpdatePage;
