import styled from "styled-components";

/** 2023/03/29 - 프로필 내용 스타일 - by 1-blue */
const StyledProfile = styled.article`
  display: flex;
  justify-content: center;
  margin-top: 1em;

  & > * + * {
    margin-left: 2em;
  }

  /** 유저 정보 및 기능 버튼들 */
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

    /** 유저 이름 / 프로필 편집 / 로그아웃 */
    & > .wrapper-header {
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

    /** 게시물 / 팔로잉 / 팔로워 버튼 */
    & > .wrapper-buttons {
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

/** 2023/03/29 - 프로필 네비게이션 스타일 - by 1-blue */
const StyledProfileNav = styled.nav``;

/** 2023/03/29 - 프로필 리스트 스타일 ( 나의 게시글들, 태그한 게시글들 ) - by 1-blue */
const StyledListWrapper = styled.ul``;

export { StyledProfile, StyledProfileNav, StyledListWrapper };
