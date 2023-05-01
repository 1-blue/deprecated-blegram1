"use client";

import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";

// util
import { getRegExp } from "@src/utils";

// hook
import { useMe } from "@src/hooks/query";

// component
import FormToolkit from "@src/components/common/FormToolkit";
import Logo from "@src/components/common/Logo";

// style
import StyledPasswordUpdateForm from "./style";

// type
import type { PasswordUpdateForm } from "@src/types";

// TODO: 배포전에 유효성 검사 주석해제하기
/** 2023/03/31 - 비밀번호 수정 페이지 - by 1-blue */
const PasswordUpdate = () => {
  /** 2023/03/31 - 로그인한 유저 비밀번호 수정 훅 - by 1-blue */
  const updatePasswordMutate = useMe.useUpdatePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordUpdateForm>();

  /** 2023/03/31 - 비밀번호 유효검 검사에 사용 - by 1-blue */
  const currentPassword = useRef<string | null>(null);
  currentPassword.current = watch("currentPassword");
  const password = useRef<string | null>(null);
  password.current = watch("password");

  /** 2023/03/31 - 회원가입 수행 핸들러 - by 1-blue */
  const onUpdatePassword: React.FormEventHandler<HTMLFormElement> =
    handleSubmit(
      useCallback(
        async ({ passwordCheck, ...body }) => updatePasswordMutate(body),
        [updatePasswordMutate]
      )
    );

  return (
    <StyledPasswordUpdateForm onSubmit={onUpdatePassword}>
      <h1>Blegram - 비밀번호 변경</h1>

      <Logo width={60} height={60} />

      {/* 이전 비밀번호 */}
      <FormToolkit.Input
        id="currentPassword"
        type="password"
        placeholder="기존 비밀번호를 입력해주세요."
        subText={errors.currentPassword?.message}
        {...register("currentPassword", {
          required: "기존 비밀번호를 입력해주세요!",
          // pattern: {
          //   value: getRegExp("password"),
          //   message:
          //     "숫자와 영어가 최소 한 글자 이상 포함되고, 최소 8자리, 최대 16자리여야 합니다!",
          // },
        })}
      />
      {/* 새 비밀번호 */}
      <FormToolkit.Input
        id="password"
        type="password"
        placeholder="새로운 비밀번호를 입력해주세요."
        subText={errors.password?.message}
        {...register("password", {
          required: "새로운 비밀번호를 입력해주세요!",
          // validate: (value) =>
          //   value !== currentPassword.current || "현재 비밀번호와 일치합니다!",
          // pattern: {
          //   value: getRegExp("password"),
          //   message:
          //     "숫자와 영어가 최소 한 글자 이상 포함되고, 최소 8자리, 최대 16자리여야 합니다!",
          // },
        })}
      />
      {/* 새 비밀번호 확인 */}
      <FormToolkit.Input
        id="passwordCheck"
        type="password"
        placeholder="새로운 비밀번호를 다시 입력해주세요."
        subText={errors.passwordCheck?.message}
        {...register("passwordCheck", {
          required: "새로운 비밀번호가 일치하지 않습니다!",
          // validate: (value) =>
          //   value === password.current || "비밀번호가 일치하지 않습니다!",
        })}
      />
      <br />
      <FormToolkit.Button type="submit">비밀번호 변경</FormToolkit.Button>
    </StyledPasswordUpdateForm>
  );
};

export default PasswordUpdate;
