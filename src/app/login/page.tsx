"use client";

import { FormEventHandler, useCallback } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

// component
import FormToolkit from "@src/components/common/FormToolkit";

// style
import StyledLogInForm from "./style";

// type
import type { LogInForm } from "@src/types";
import Logo from "@src/components/common/Logo";
import { apiServiceAuth } from "@src/apis";

/** 2023/03/24 - 로그인 페이지 - by 1-blue */
const LogInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInForm>();

  /** 2023/03/25 - 로그인 수행 핸들러 - by 1-blue */
  const onLogIn: FormEventHandler<HTMLFormElement> = handleSubmit(
    useCallback(async (body) => {
      try {
        const { data } = await apiServiceAuth.apiLogIn(body);

        console.log("data >> ", data);
      } catch (error) {
        console.error(error);
      }
    }, [])
  );

  return (
    <StyledLogInForm onSubmit={onLogIn}>
      <h1>Blegram - 로그인</h1>

      <Logo width={60} height={60} />

      <FormToolkit.Input
        id="id"
        type="text"
        placeholder="아이디를 입력해주세요."
        subText={errors.id?.message}
        {...register("id", { required: "아이디를 입력해주세요!" })}
      />
      <FormToolkit.Input
        id="password"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        subText={errors.password?.message}
        {...register("password", { required: "비밀번호를 입력해주세요!" })}
      />
      <br />
      <FormToolkit.Button type="submit">로그인</FormToolkit.Button>

      <div>
        <Link href="/login">비밀번호를 잊으셨나요?</Link>
        <Link href="/signup">새 계정 만들기</Link>
      </div>
    </StyledLogInForm>
  );
};

export default LogInPage;

// export const metadata = {
//   title: "blegram | 로그인",
// };
