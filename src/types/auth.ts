/** 2023/03/25 - 회원가입 요청 타입 - by 1-blue */
export interface SignUpForm {
  id: string;
  password: string;
  passwordCheck: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  introduction: string;
  avatar?: string;
}

/** 2023/03/25 - 로그인 요청 타입 - by 1-blue */
export interface LogInForm {
  id: string;
  password: string;
}
