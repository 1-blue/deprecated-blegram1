"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

// hook
import useMe from "@src/hooks/query/useMe";
import useUser from "@src/hooks/query/useUser";
import useLogOut from "@src/hooks/query/useLogOut";
import useUploadAvatar from "@src/hooks/query/useUploadAvatar";
import useUpdateAvatar from "@src/hooks/query/useUpdateAvatar";

// api
import { apiServicePhoto } from "@src/apis";

// component
import Avatar from "@src/components/common/Avatar";

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
  const logoutMutate = useLogOut();

  /** 2023/04/01 - 프로필 이미지 "S3"에 업로드 훅 - by 1-blue */
  const uploadAvatarMutata = useUploadAvatar();
  /** 2023/04/01 - 프로필 이미지 서버에 업로드 훅 - by 1-blue */
  const updateAvatarMutata = useUpdateAvatar();
  /** 2023/04/01 - 프로필 이미지 input value - by 1-blue */
  const [avatar, setAvatar] = useState<null | FileList>(null);
  /** 2023/04/01 - 프로필 이미지 ref - by 1-blue */
  const avatarRef = useRef<null | HTMLInputElement>(null);
  /** 2023/04/01 - 프로필 이미지 미리보기 - by 1-blue */
  const [previewAvatar, setPreviewAvatar] = useState("");
  /** 2023/04/01 - 프로필 이미지 미리보기 등록 - by 1-blue */
  useEffect(() => {
    // 썸네일이 입력되면 브라우저에서만 보여줄 수 있도록 blob url 얻기
    if (avatar && avatar.length > 0) {
      setPreviewAvatar(URL.createObjectURL(avatar[0]));
    }
  }, [avatar]);

  /** 2023/04/01 - 이미지 등록 취소 핸들러 - by 1-blue */
  const onCancelAvatar = useCallback(() => {
    setAvatar(null);
    setPreviewAvatar("");
  }, []);

  /** 2023/04/01 - 이미지 등록 핸들러 - by 1-blue */
  const onUpdateAvatar = useCallback(async () => {
    if (!avatar) return;

    // 서버에서 "presignedURL" 생성 후 가져오기
    const { preSignedURL } = await apiServicePhoto.apiFetchPresignedURL({
      name: avatar[0].name,
    });

    // 완성될 이미지 경로 얻기
    const avatarPath = preSignedURL
      .slice(0, preSignedURL.indexOf("?"))
      .slice(preSignedURL.indexOf(process.env.NODE_ENV));

    // 아바타 이미지 "S3"에 업로드
    uploadAvatarMutata({ file: avatar[0], preSignedURL });

    // 아바타 이미지 경로 서버에 업로드
    updateAvatarMutata({ avatar: avatarPath });
  }, [avatar, uploadAvatarMutata, updateAvatarMutata]);

  // 데이터 패칭중인 경우 FIXME:
  if (isFetchingUser) return <>로딩중...</>;

  // 유저 데이터가 없는 경우 FIXME:
  if (!user) return <>유저 데이터가 없는 경우</>;

  // 본인인지
  const isMine = me?.idx === user.idx;

  return (
    <>
      <StyledProfile>
        <input
          type="file"
          ref={avatarRef}
          onChange={(e) => setAvatar(e.target.files)}
          hidden
        />
        <button type="button" onClick={() => avatarRef.current?.click()}>
          <Avatar
            src={previewAvatar || user.avatar}
            alt={`${user.nickname}님의 프로필 이미지`}
          />
        </button>

        {/* 프로필 이미지 업로드 컨펌 모달창 */}
        {previewAvatar && (
          <aside>
            <button type="button" onClick={onUpdateAvatar}>
              이미지 저장
            </button>
            <button type="button" onClick={onCancelAvatar}>
              이미지 취소
            </button>
          </aside>
        )}
        <section>
          <ul className="rename-0">
            <li>
              <h2>{user.name}</h2>
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
          <ul className="rename-1">
            {/* FIXME: 서버로 받아온 데이터 채우기 */}
            <li>게시물 0</li>
            <li>팔로워 0</li>
            <li>팔로잉 0</li>
          </ul>
          <section className="rename-2">
            <h2>{user.nickname}</h2>
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
