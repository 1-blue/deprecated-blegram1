import styled from "styled-components";

/** 2023/03/29 - 프로필 내용 스타일 - by 1-blue */
const StyledProfile = styled.article`
  display: flex;
  justify-content: center;
  margin-top: 2em;

  & > * + * {
    margin-left: 2em;
  }

  /** 유저 정보 및 기능 버튼들 */
  & > section {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;

    & > * + * {
      margin-top: 1.2em;
    }

    & > ul {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & > li + li {
        margin-left: 1.4em;
      }
    }

    /** 유저 이름 / 프로필 편집 / 로그아웃 */
    & > .wrapper-header {
      & > li {
        height: 100%;

        /* 이름 */
        & > h2 {
          font-size: 1.4rem;
          font-weight: bold;
        }

        /* 프로필 편집, 로그아웃 */
        & > a,
        & > button[type="button"] {
          height: inherit;

          display: inline-block;

          padding: 0.6em 0.8em;

          color: ${({ theme }) => theme.colors.bg};
          background-color: ${({ theme }) => theme.colors.fg};

          font-size: 0.8rem;
          font-weight: bold;
          border-radius: 0.4em;

          text-align: center;
          line-height: 1;

          transition: all 0.3s;

          &:hover {
            background-color: ${({ theme }) => theme.colors.bgGray};
          }
        }
      }
    }

    /** 게시물 / 팔로잉 / 팔로워 버튼 */
    & > .wrapper-buttons {
      & > li {
        & > button,
        & > span {
          font-size: 1rem;
          line-height: 1;

          color: ${({ theme }) => theme.colors.fg};
        }
      }
    }

    /** 닉네임 / 자기소개 */
    & > .wrapper-info {
      & > h2 {
        font-size: 0.95em;
        font-weight: bold;
        margin-bottom: 0.2em;
      }

      & > p {
        font-size: 0.8em;
        line-height: 1.4;
        white-space: pre-line;
      }
    }
  }
`;

export default StyledProfile;
