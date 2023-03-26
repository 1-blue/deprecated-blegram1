import bcrypt from "bcrypt";
import { JsonWebTokenError, sign, verify, type JwtPayload } from "jsonwebtoken";

interface HashingHandler {
  (password: string, saltRound?: number): Promise<string>;
}
/** 2023/03/25 - 비밀번호 암호화 - by 1-blue */
export const hashing: HashingHandler = async (password, saltRound = 10) => {
  // 해싱할 때 사용할 값 생성
  const salt = await bcrypt.genSalt(saltRound);

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, salt); // password 해쉬화 완성

  // 해싱한 비밀번호 반환
  return hashedPassword;
};

interface Payload {
  idx: number;
}
interface generateTokenHandler {
  (payload: Payload): string;
}
/**
 * 2023/03/26 - 인증 토큰 발행 ( 유효 기간 1시간 ) - by 1-blue
 * @param payload 토큰의 페이로드
 * @returns 인증 토큰
 */
export const generateAccessToken: generateTokenHandler = (payload) =>
  sign(payload, process.env.ACCESS_SECRET, { expiresIn: "1h" });

/**
 * 2023/03/26 - 리프레쉬 토큰 발행 ( 유효 기간 7일 ) - by 1-blue
 * @param payload 토큰의 페이로드
 * @returns 인증 토큰
 */
export const generateRefreshToken: generateTokenHandler = (payload) =>
  sign(payload, process.env.REFRESH_SECRET, { expiresIn: "7d" });

interface VerifyTokenHandler {
  (type: "access" | "refresh", token: string):
    | {
        payload: JwtPayload;
        status: "SUCCESS";
      }
    | {
        payload: null;
        status: "EXPIRED" | "INVALID";
      };
}
/**
 * 2023/03/26 - 토큰 검증 - by 1-blue
 * @param type 토큰 타입
 * @param token 검증할 토큰
 * @returns 검증 결과
 */
export const verifyToken: VerifyTokenHandler = (type, token) => {
  let secretKey = "";

  switch (type) {
    case "access":
      secretKey = process.env.ACCESS_SECRET;
      break;
    case "refresh":
      secretKey = process.env.REFRESH_SECRET;
      break;
  }

  try {
    const payload = verify(token, secretKey) as JwtPayload;

    return { payload, status: "SUCCESS" };
  } catch (error) {
    // 토큰 관련 에러
    if (error instanceof JsonWebTokenError) {
      // 인증 토큰 만료 ( 인증 토큰 재발급 )
      if (error.message === "jwt expired") {
        return { payload: null, status: "EXPIRED" };
      }
    }

    return { payload: null, status: "INVALID" };
  }
};
