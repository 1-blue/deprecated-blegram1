"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

// api
import { apiServiceAuth } from "@src/apis";

// component
import FormToolkit from "@src/components/common/FormToolkit";
import Logo from "@src/components/common/Logo";

// style
import StyledLogInForm from "./style";

// type
import type { LogInForm } from "@src/types";

/** 2023/03/24 - 로그인 페이지 - by 1-blue */
const LogInPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInForm>();

  /** 2023/03/25 - 로그인 수행 핸들러 - by 1-blue */
  const onLogIn: React.FormEventHandler<HTMLFormElement> = handleSubmit(
    useCallback(
      async (body) => {
        try {
          const { message } = await apiServiceAuth.apiLogIn(body);

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
