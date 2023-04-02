"use client";

import { useCallback } from "react";
import Link from "next/link";

// hook
import useMe from "@src/hooks/query/useMe";
import useUser from "@src/hooks/query/useUser";
import useLogOut from "@src/hooks/query/useLogOut";
import useUpdateAvatar from "@src/hooks/query/useUpdateAvatar";

// component
import FormToolkit from "@src/components/common/FormToolkit";

// api
import { apiServicePhoto } from "@src/apis";

// style
import { StyledProfile, StyledProfileNav, StyledListWrapper } from "./style";

// type
interface Props {
  params: { nickname: string };
  searchParams: {};
}

/** 2023/03/27 - 프로필 페이지 - by 1-blue */
const ProfilePage: React.FC<Props> = ({ params: { nickname } }) => {
  const { me } = useMe();
  const { user, isFetchingUser } = useUser(nickname);

  /** 2023/03/31 - 로그아웃 훅 - by 1-blue */
  const logoutMutate = useLogOut();
  /** 2023/04/01 - 프로필 이미지 서버에 업로드 훅 - by 1-blue */
  const updateAvatarMutata = useUpdateAvatar();

  /** 2023/04/01 - 이미지 등록 핸들러 - by 1-blue */
  const onUploadAvatar = useCallback(
    async (filelist: null | FileList) => {
      if (!filelist) return;

      // TODO: 이미지 업로드중인 경우 스피너 구현하기

      // 서버에서 "presignedURL" 생성 후 가져오기
      const { preSignedURL } = await apiServicePhoto.apiFetchPresignedURL({
        name: filelist[0].name,
      });

      // 완성될 이미지 경로 얻기
      const avatarPath = preSignedURL
        .slice(0, preSignedURL.indexOf("?"))
        .slice(preSignedURL.indexOf(process.env.NODE_ENV));

      // 아바타 이미지 "S3"에 업로드
      await apiServicePhoto.apiUploadPhoto({ file: filelist[0], preSignedURL });

      // 아바타 이미지 경로 서버에 업로드
      updateAvatarMutata({ avatar: avatarPath });
    },
    [updateAvatarMutata]
  );

  // 데이터 패칭중인 경우 FIXME:
  if (isFetchingUser) return <>로딩중...</>;

  // 유저 데이터가 없는 경우 FIXME:
  if (!user) return <>유저 데이터가 없는 경우</>;

  // 본인인지
  const isMine = me?.idx === user.idx;

  return (
    <>
      <StyledProfile>
        <FormToolkit.SinglePhotoInput
          width={120}
          height={120}
          src={user.avatar || "/photo/user.png"}
          alt={`${user.nickname}님의 프로필 이미지`}
          onUploadPhoto={onUploadAvatar}
        />

        {/* 유저 정보와 기능 버튼들 */}
        <section>
          <ul className="wrapper-header">
            <li>
              <h2>{user.nickname}</h2>
            </li>
            {isMine ? (
              <>
                <li>
                  <Link href={`/${me.nickname}/update`}>프로필 편집</Link>
                </li>
                <li>
                  <button type="button" onClick={() => logoutMutate({})}>
                    로그아웃
                  </button>
                </li>
              </>
            ) : (
              <li>
                {/* 나중에 토글버튼으로 수정 */}
                <button type="button">팔로우</button>
              </li>
            )}
          </ul>
          <ul className="wrapper-buttons">
            {/* FIXME: 서버로 받아온 데이터 채우기 */}
            <li>게시물 0</li>
            <li>팔로워 0</li>
            <li>팔로잉 0</li>
          </ul>
          <section className="wrapper-info">
            <h2>{user.name}</h2>
            <p>{user.introduction}</p>
          </section>
        </section>
      </StyledProfile>

      <StyledProfileNav>
        <li>게시물</li>
        <li>저장됨</li>
      </StyledProfileNav>

      <StyledListWrapper>
        <li>게시글 리스트 - 1</li>
        <li>게시글 리스트 - 2</li>
        <li>게시글 리스트 - 3</li>
      </StyledListWrapper>
    </>
  );
};

export default ProfilePage;
