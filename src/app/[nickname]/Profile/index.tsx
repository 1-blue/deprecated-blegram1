"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

// hook
import { useMe, useUser, useAuth, useFollow } from "@src/hooks/query";
import useFollowerModal from "@src/hooks/recoil/useFollowerModal";
import useFollowingModal from "@src/hooks/recoil/useFollowingModal";

// component
import FormToolkit from "@src/components/common/FormToolkit";
import Spinner from "@src/components/common/Spinner";
import NotFound from "@src/components/common/NotFound";
import Modal from "@src/components/common/Modal";

// api
import { apiServicePhoto } from "@src/apis";

// style
import StyledProfile from "./style";

// type
import type { ApiFetchUserResponse } from "@src/types/api";
interface Props {
  nickname: string;
  initialData?: ApiFetchUserResponse;
}

/** 2023/03/27 - 프로필 페이지 - by 1-blue */
const Profile: React.FC<Props> = ({ nickname, initialData }) => {
  const { me } = useMe.useFetchMe({});
  const { user, isFetchingUser } = useUser.useFetchUser({
    nickname,
    // initialData,
  });

  /** 2023/03/31 - 로그아웃 훅 - by 1-blue */
  const logoutMutate = useAuth.useLogOut();
  /** 2023/04/01 - 프로필 이미지 서버에 업로드 훅 - by 1-blue */
  const updateAvatarMutata = useMe.useUpdateAvatar();

  /** 2023/04/02 - 이미지 등록중인지 판단할 변수 - by 1-blue */
  const [isUploadAvatar, setIsUploadAvatar] = useState(false);

  /** 2023/04/01 - 이미지 등록 핸들러 - by 1-blue */
  const onUploadAvatar = useCallback(
    async (filelist: null | FileList) => {
      if (!filelist) return;

      try {
        setIsUploadAvatar(true);

        // 서버에서 "presignedURL" 생성 후 가져오기
        const { presignedURL } = await apiServicePhoto.apiFetchPresignedURL({
          name: filelist[0].name,
        });

        // 완성될 이미지 경로 얻기
        const avatarPath = presignedURL
          .slice(0, presignedURL.indexOf("?"))
          .slice(presignedURL.indexOf(process.env.NODE_ENV));

        // 아바타 이미지 "S3"에 업로드
        await apiServicePhoto.apiUploadPhoto({
          file: filelist[0],
          presignedURL,
        });

        // 아바타 이미지 경로 서버에 업로드
        updateAvatarMutata({ avatarPath });
      } catch (error) {
        console.error("아바타 이미지 업로드 에러 >> ", error);
      } finally {
        setIsUploadAvatar(false);
      }
    },
    [updateAvatarMutata]
  );

  /** 2023/05/12 - 팔로워 모달관련 훅 - by 1-blue */
  const { followerModalData, openFollowerModal } = useFollowerModal();
  /** 2023/05/13 - 팔로잉 모달관련 훅 - by 1-blue */
  const { followingModalData, openFollowingModal } = useFollowingModal();

  /** 2023/05/31 - 팔로우 요청 훅 - by 1-blue */
  const mutateFollow = useFollow.useCreateFollow();
  /** 2023/05/31 - 언팔로우 요청 훅 - by 1-blue */
  const mutateUnfollow = useFollow.useDeleteFollow();

  /** 2023/05/31 - 팔로우했는지 여부 - by 1-blue */
  const isFollowed = user?.followers.length || 0 > 0;

  /** 2023/05/31 - 팔로우/언팔로우 요청 - by 1-blue */
  const onFollowOrUnfollow: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      if (!me) return toast.warning("로그인후에 접근해주세요!");
      if (!user) return toast.warning("새로고침후에 다시 시도해주세요!");

      const userIdx = user.idx;
      const followerIdx = me.idx;

      // 언팔로우 요청
      if (isFollowed) mutateUnfollow({ userIdx, followerIdx, nickname });
      // 팔로우 요청
      else mutateFollow({ userIdx, followerIdx, nickname });
    }, [me, user, isFollowed, nickname, mutateFollow, mutateUnfollow]);

  // 데이터 패칭중인 경우
  if (isFetchingUser) return <Spinner.Page />;

  // 유저 데이터가 없는 경우
  if (!user) return <NotFound text="존재하지 않는 유저입니다." />;

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
                  <Link
                    href={
                      `/${me.nickname}/update` as __next_route_internal_types__.RouteImpl<string>
                    }
                  >
                    프로필 편집
                  </Link>
                </li>
                <li>
                  <button type="button" onClick={() => logoutMutate({})}>
                    로그아웃
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button type="button" onClick={onFollowOrUnfollow}>
                  {isFollowed ? "언팔로우" : "팔로우"}
                </button>
              </li>
            )}
          </ul>
          <ul className="wrapper-buttons">
            <li>
              <span>게시물 {user._count.posts}</span>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  if (user._count.followers === 0) {
                    return toast.warning("팔로워가 없습니다.");
                  }

                  openFollowerModal(user.idx, user.nickname);
                }}
              >
                팔로워 {user._count.followers}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  if (user._count.followings === 0) {
                    return toast.warning("팔로잉이 없습니다.");
                  }

                  openFollowingModal(user.idx, user.nickname);
                }}
              >
                팔로잉 {user._count.followings}
              </button>
            </li>
          </ul>
          <section className="wrapper-info">
            <h2>{user.name}</h2>
            <p>{user.introduction}</p>
          </section>
        </section>
      </StyledProfile>

      {/* 팔로워 모달 */}
      {followerModalData.isOpen && <Modal.Follower />}
      {/* 팔로잉 모달 */}
      {followingModalData.isOpen && <Modal.Following />}

      {/* 아바타 업로드중 스피너 */}
      {isUploadAvatar && <Spinner.Page />}
    </>
  );
};

export default Profile;
