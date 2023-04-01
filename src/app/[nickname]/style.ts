import styled from "styled-components";

/** 2023/03/29 - 프로필 내용 스타일 - by 1-blue */
const StyledProfile = styled.article`
  display: flex;
  justify-content: center;
  margin-top: 1em;

  & > * + * {
    margin-left: 2em;
  }

  /** 프로필 이미지 */
  & > button {
    & > figure {
      width: 120px;
      height: 120px;

      border-radius: 50%;
    }
  }

  /** 프로필 이미지 수정/취소 모달 */
  & > aside {
    position: fixed;
    bottom: 10vh;
    margin: 0 auto;
    padding: 0.4em 0.2em;

    border-radius: 0.2em;

    color: ${({ theme }) => theme.colors.bg};
    background-color: ${({ theme }) => theme.colors.fg};

    /** 프로필 이미지 수정/취소 버튼 */
    & > button[type="button"] {
      padding: 0.4em 0.5em;

      font-size: 0.9rem;
      font-weight: bold;

      border-radius: 0.2em;
      color: ${({ theme }) => theme.colors.bg};

      transition: all 0.4s;

      &:hover {
        color: ${({ theme }) => theme.colors.fg};
        background-color: ${({ theme }) => theme.colors.bg};
      }
    }
  }

  & > section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;

    & > ul {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > li + li {
        margin-left: 1.4em;
      }
    }

    & > .rename-0 {
      & > li {
        /* 이름 */
        & > h2 {
          font-size: 1.4rem;
          font-weight: bold;
        }

        /* 프로필 편집, 로그아웃 */
        & > a,
        & > button[type="button"] {
          display: inline-block;

          padding: 0.6em 0.8em;

          color: ${({ theme }) => theme.colors.bg};
          background-color: ${({ theme }) => theme.colors.fg};

          font-size: 0.8rem;
          font-weight: bold;
          border-radius: 0.4em;

          transition: all 0.3s;

          &:hover {
            background-color: ${({ theme }) => theme.colors.bgGray};
          }
        }
      }
    }

    & > .rename-2 {
      & > p {
        font-size: 0.9em;
        line-height: 1.4;
        white-space: pre-line;
      }
    }
  }
`;

/** 2023/03/29 - 프로필 네비게이션 스타일 - by 1-blue */
const StyledProfileNav = styled.nav``;

/** 2023/03/29 - 프로필 리스트 스타일 ( 나의 게시글들, 태그한 게시글들 ) - by 1-blue */
const StyledListWrapper = styled.ul``;

export { StyledProfile, StyledProfileNav, StyledListWrapper };
