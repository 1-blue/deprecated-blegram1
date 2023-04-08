import styled from "styled-components";

// type
interface StyledProps {
  width: number;
}

/** 2023/04/08 - 게시글 업로드 페이지 스타일 */
const StyledPostUploadPage = styled.article<StyledProps>`
  width: ${({ width }) => width}px;
  padding: 0 1em;
  margin: 0 auto;

  & > * {
    margin-top: 2em;
  }

  /* 제목 */
  & > h1 {
    margin-top: 1em;

    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }

  /* 이미지 등록 */
  & > div {
    & > span {
      display: inline-block;
      margin-bottom: 0.4em;

      font-size: 0.8rem;
      color: gray;
    }
  }

  /* 문구 입력 및 등록 버튼 */
  & > form {
    display: flex;
    flex-flow: column nowrap;

    & > button {
      margin-top: 1em;
    }
  }
`;

export default StyledPostUploadPage;
