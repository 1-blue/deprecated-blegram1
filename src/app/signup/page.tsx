"use client";

import { FormEventHandler, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

// util
import { getRegExp } from "@src/utils";

// api
import { apiServiceAuth } from "@src/apis";

// component
import FormToolkit from "@src/components/common/FormToolkit";
import Logo from "@src/components/common/Logo";

// style
import StyledSignUpForm from "./style";

// type
import type { SignUpForm } from "@src/types";

// FIXME: 배포전에 validate 주석 해제하기
/** 2023/03/25 - 회원가입 페이지 - by 1-blue */
const SignUpPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignUpForm>();

  /** 2023/03/25 - 회원가입 수행 핸들러 - by 1-blue */
  const onSignUp: FormEventHandler<HTMLFormElement> = handleSubmit(
    useCallback(
      async ({ passwordCheck, ...body }) => {
        try {
          // TODO: 아바타(이미지) 먼저 등록

          const { message } = await apiServiceAuth.apiSignUp(body);

          toast.success(message);
          router.replace("/");
        } catch (error) {
          let message = "알 수 없는 오류가 발생했습니다.";

          if (error instanceof AxiosError) {
            message = error.response?.data.message;
          } else if (error instanceof Error) {
            message = error.message;
          }

          toast.warning(message);
        }
      },
      [router]
    )
  );

  /** 2023/03/25 - 비밀번호 확인에 사용 - by 1-blue */
  const password = useRef<string | null>(null);
  password.current = watch("password");

  // FIXME: 개발에만 적용할 것
  useEffect(() => {
    setValue("id", "a");
    setValue("password", "a");
    setValue("passwordCheck", "a");
    setValue("name", "1-blue");
    setValue("email", "1-blue98@naver.com");
    setValue("phone", "01021038259");
    setValue("birthday", "19981106");
    setValue("introduction", "아무것도 하지 않을 거면 죽어버려.");
  }, [setValue]);

  return (
    <StyledSignUpForm onSubmit={onSignUp}>
      <h1>Blegram - 회원가입</h1>

      <Logo width={60} height={60} />

      {/* 아이디 */}
      <FormToolkit.Input
        id="id"
        type="text"
        placeholder="아이디를 입력해주세요."
        subText={errors.id?.message}
        {...register("id", {
          required: "아이디를 입력해주세요!",
          // pattern: {
          //   value: getRegExp("id"),
          //   message:
          //     "숫자와 영어가 최소 한 글자 이상 포함되고, 최소 6자리, 최대 16자리여야 합니다!",
          // },
        })}
      />
      {/* 비밀번호 */}
      <FormToolkit.Input
        id="password"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        subText={errors.password?.message}
        {...register("password", {
          required: "비밀번호를 입력해주세요!",
          // pattern: {
          //   value: getRegExp("password"),
          //   message:
          //     "숫자와 영어가 최소 한 글자 이상 포함되고, 최소 8자리, 최대 16자리여야 합니다!",
          // },
        })}
      />
      {/* 비밀번호 확인 */}
      <FormToolkit.Input
        id="passwordCheck"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        subText={errors.passwordCheck?.message}
        {...register("passwordCheck", {
          required: "비밀번호가 일치하지 않습니다!",
          validate: (value) =>
            value === password.current || "비밀번호가 일치하지 않습니다!",
        })}
      />
      {/* 이름 */}
      <FormToolkit.Input
        id="name"
        type="text"
        placeholder="이름을 입력해주세요."
        subText={errors.name?.message}
        {...register("name", {
          required: "이름을 입력해주세요!",
          // maxLength: {
          //   value: 20,
          //   message: "20자 이내로 입력해주세요.",
          // },
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
          // pattern: {
          //   value: getRegExp("email"),
          //   message: "이메일 형식에 맞게 입력해 주세요.",
          // },
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
          // pattern: {
          //   value: getRegExp("phone"),
          //   message: "숫자만 11자리 입력해 주세요.",
          // },
        })}
      />
      {/* 생년월일 */}
      <FormToolkit.Input
        id="birthday"
        type="text"
        placeholder="생년월일을 입력해 주세요. ( 19981106 )"
        subText={errors.birthday?.message}
        {...register("birthday", {
          required: "생년월일을 입력해주세요!",
          // pattern: {
          //   value: getRegExp("birthday"),
          //   message: "숫자만 8자리 입력해 주세요.",
          // },
        })}
      />
      {/* 자기 소개 */}
      <FormToolkit.Textarea
        id="introduction"
        placeholder="5줄 이내로 간단한 자기소개를 입력해주세요."
        subText={errors.introduction?.message}
        {...register("introduction", {
          // maxLength: {
          //   value: 100,
          //   message: "100자 이내로 입력해주세요.",
          // },
        })}
      />
      <br />
      <FormToolkit.Button type="submit">회원가입</FormToolkit.Button>
    </StyledSignUpForm>
  );
};

export default SignUpPage;

// export const metadata = {
//   title: "blegram | 회원가입",
// };
