import styled from "styled-components";

/** 2023/04/08 - 여러 이미지 업로드 인풋 스타일 - by 1-blue */
const StyledMultiPhoto = styled.article`
  display: flex;
  justify-content: center;

  & > figure {
    position: relative;
    width: 100%;
    height: 400px;

    padding: 4px;

    border-radius: 0.4em;
    border: 2px solid ${({ theme }) => theme.colors.bgGray};

    & > svg {
      position: absolute;
      inset: 50%;
      transform: translate(-50%, -50%);
    }

    & img {
      border-radius: 0.3em;
    }

    &:hover > button[type="button"] {
      display: inline-block;
    }

    & > button[type="button"] {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;

      display: none;

      & > svg {
        position: absolute;
        inset: 50%;

        transform: translate(-50%, -50%);
      }
    }

    @media ${({ theme }) => theme.mediaSize.xs} {
      height: 320px;
    }
  }

  & > .modal {
    position: fixed;
    left: 50%;
    bottom: 10vh;
    padding: 0.4em;

    border-radius: 0.3em;

    color: ${({ theme }) => theme.colors.bg};
    background-color: ${({ theme }) => theme.colors.fg};

    transform: translateX(-50%);

    animation: ${({ theme }) => theme.animation.fadeUp} 1s;

    /** 프로필 이미지 수정/취소 버튼 */
    & > button[type="button"] {
      padding: 0.4em 0.5em;

      font-size: 0.9rem;
      font-weight: bold;

      border-radius: 0.4em;
      color: ${({ theme }) => theme.colors.bg};

      transition: all 0.2s;

      &:hover {
        color: ${({ theme }) => theme.colors.fg};
        background-color: ${({ theme }) => theme.colors.bg};
      }
    }
  }
`;

export default StyledMultiPhoto;
