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
