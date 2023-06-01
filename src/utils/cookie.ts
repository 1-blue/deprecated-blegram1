interface GenerateCookieHandler {
  (name: string, value: string, maxAge: number): string;
}
/**
 * 2023/03/26 - "Set-Cookie" 헤더 생성 - by 1-blue
 * @param name 쿠키 이름
 * @param value 쿠키 값
 * @param maxAge 쿠키 지속 시간
 * @returns 쿠키 헤더 값
 */
export const generateCookie: GenerateCookieHandler = (name, value, maxAge) => {
  const domain =
    process.env.NODE_ENV === "development" ? "localhost" : "blegram.vercel.app";
  const path = "/";
  const sameSite = "Strict";

  return `${name}=${value}; Domain=${domain}; Path=${path}; SameSite=${sameSite}; Max-Age=${maxAge}; HttpOnly; Secure;`;
};

interface ClearCookieHandler {
  (name: string, value?: string): string;
}

/**
 * 2023/03/26 - 특정 쿠키 제거 - by 1-blue
 * @param name 쿠키 이름
 * @param value 쿠키 값
 * @returns 쿠키 유효기한 없애기
 */
export const clearCookie: ClearCookieHandler = (name, value) => {
  const domain =
    process.env.NODE_ENV === "development" ? "localhost" : "blegram.vercel.app";
  const path = "/";
  const sameSite = "Strict";

  return `${name}=${value}; Domain=${domain}; Path=${path}; SameSite=${sameSite}; Max-Age=${0}; HttpOnly; Secure;`;
};
