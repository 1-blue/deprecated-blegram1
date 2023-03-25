// type
type RegExpType = "id" | "password" | "email" | "phone" | "birthday";
interface GetRegExpHandler {
  (type: RegExpType): RegExp;
}

/**
 * 2023/03/25 - 원하는 정규 표현식 가져오기 - by 1-blue
 * @param type 원하는 정규 표현식 타입
 * @returns 선택한 정규 표현식
 */
export const getRegExp: GetRegExpHandler = (type) => {
  switch (type) {
    case "id":
      // 숫자와 영어가 최소 한 글자 이상 포함되고, 최소 6자리 최대 16자리
      return /(?=.*\d)(?=.*[a-zA-ZS]).{6,16}/;

    case "password":
      // 숫자와 영어가 최소 한 글자 이상 포함되고, 최소 8자리 최대 16자리
      return /(?=.*\d)(?=.*[a-zA-ZS]).{8,16}/;

    case "email":
      // 이메일 형식에 맞게 입력
      return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

    case "phone":
      // 숫자만 11자리
      return /[0-9]{11,11}/;

    case "birthday":
      // 숫자만 8자리
      return /[0-9]{8,8}/;
  }
};
