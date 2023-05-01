"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";

// api
import { apiServicePhoto } from "@src/apis";

// util
import { getRegExp } from "@src/utils";

// hook
import useMe from "@src/hooks/query/useMe";
import useUser from "@src/hooks/query/useUser";
import useUpdateMe from "@src/hooks/query/useUpdateMe";
import useUpdateAvatar from "@src/hooks/query/useUpdateAvatar";

// component
import FormToolkit from "@src/components/common/FormToolkit";
import Spinner from "@src/components/common/Spinner";

// style
import StyledProfileUpdatePage from "./style";

// type
import type { ProfileUpdateForm } from "@src/types";
interface Props {
  nickname: string;
}

/** 2023/03/29 - 프로필 수정 페이지 컴포넌트 - by 1-blue */
const ProfileUpdate: React.FC<Props> = ({ nickname }) => {
  const router = useRouter();

  /** 2023/03/30 - 로그인한 유저 정보 - by 1-blue */
  const { me, isFetchingMe } = useMe();
  /** 2023/03/30 - 현재 페이지의 유저 정보 - by 1-blue */
  const { user, isFetchingUser } = useUser({ nickname });
  /** 2023/03/30 - 로그인한 유저 정보 수정 뮤테이트 훅 - by 1-blue */
  const updateMeMudate = useUpdateMe();
  /** 2023/04/02 - 프로필 이미지 서버에 업로드 훅 - by 1-blue */
  const updateAvatarMutata = useUpdateAvatar();

  /** 2023/04/02 - 이미지 등록중인지 판단할 변수 - by 1-blue */
  const [isUploadAvatar, setIsUploadAvatar] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileUpdateForm>();

  /** 2023/03/29 - 프로필 수정 권한이 있는지 검사 - by 1-blue */
  useEffect(() => {
    // 데이터 패칭중인 경우
    if (isFetchingMe || isFetchingUser) return;

    // 로그인을 하지 않은 경우
    if (!me) return router.back();

    // 존재하지 않는 유저인 경우
    if (!user) return router.back();

    // 로그인한 유저가 아닌 경우
    if (me.idx !== user.idx) return router.back();
  }, [isFetchingMe, isFetchingUser, me, user, router]);

  /** 2023/03/29 - 기존 데이터 넣기 - by 1-blue */
  useEffect(() => {
    if (!me) return;

    setValue("idx", me.idx);
    setValue("name", me.name);
    setValue("nickname", me.nickname);
    setValue("email", me.email);
    setValue("phone", me.phone);
    setValue("introduction", me.introduction);
  }, [me, setValue]);

  /** 2023/03/30 - 프로필 수정 핸들러 - by 1-blue */
  const onSubmit: React.FormEventHandler<HTMLFormElement> = handleSubmit(
    useCallback((body) => updateMeMudate(body), [updateMeMudate])
  );

  /** 2023/04/02 - 이미지 등록 핸들러 - by 1-blue */
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

  // 데이터 패칭중인 경우
  if (isFetchingMe || isFetchingUser) return <Spinner.Page />;

  // 유저 데이터가 없는 경우
  if (!me || !user) return <Spinner.Page />;

  return (
    <>
      <StyledProfileUpdatePage onSubmit={onSubmit}>
        <FormToolkit.SinglePhotoInput
          width={160}
          height={160}
          src={user.avatar || "/photo/user.png"}
          alt={`${user.nickname}님의 프로필 이미지`}
          onUploadPhoto={onUploadAvatar}
        />

        {/* 이름 */}
        <FormToolkit.Input
          id="name"
          type="text"
          placeholder="이름을 입력해주세요."
          subText={errors.name?.message}
          {...register("name", {
            required: "이름을 입력해주세요!",
            maxLength: {
              value: 20,
              message: "20자 이내로 입력해주세요!",
            },
          })}
        />
        {/* 별칭 */}
        <FormToolkit.Input
          id="nickname"
          type="text"
          placeholder="별칭을 입력해주세요."
          subText={errors.nickname?.message}
          {...register("nickname", {
            required: "별칭을 입력해주세요!",
            maxLength: {
              value: 30,
              message: "30자 이내로 입력해주세요!",
            },
          })}
        />
        {/* 이메일 */}
        <FormToolkit.Input
          id="email"
          type="text"
          placeholder="이메일을 입력해주세요."
          subText={errors.email?.message}
          {...register("email", {
            required: "이메일을 입력해주세요!",
            pattern: {
              value: getRegExp("email"),
              message: "이메일 형식에 맞게 입력해 주세요!",
            },
          })}
        />
        {/* 휴대폰 번호 */}
        <FormToolkit.Input
          id="phone"
          type="text"
          placeholder="휴대폰 번호를 입력해주세요."
          subText={errors.phone?.message}
          {...register("phone", {
            required: "휴대폰 번호를 입력해주세요!",
            pattern: {
              value: getRegExp("phone"),
              message: "숫자만 11자리 입력해 주세요!",
            },
            minLength: {
              value: 11,
              message: "11자리를 입력해주세요!",
            },
            maxLength: {
              value: 11,
              message: "11자리를 입력해주세요!",
            },
          })}
        />
        {/* 자기 소개 */}
        <FormToolkit.Textarea
          id="introduction"
          placeholder="5줄 이내로 간단한 자기소개를 입력해주세요."
          subText={errors.introduction?.message}
          {...register("introduction", {
            maxLength: {
              value: 100,
              message: "100자 이내로 입력해주세요!",
            },
          })}
        />
        <br />
        <FormToolkit.Button type="submit">프로필 수정</FormToolkit.Button>

        <br />
        <Link href={`/${me.nickname}/update/password`}>비밀번호 수정</Link>
      </StyledProfileUpdatePage>

      {/* 아바타 업로드중 스피너 */}
      {isUploadAvatar && <Spinner.Page />}
    </>
  );
};

export default ProfileUpdate;
