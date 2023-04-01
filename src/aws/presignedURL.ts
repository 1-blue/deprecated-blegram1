import { S3 } from ".";

// type
import type { ApiFetchPresignedURLHandler } from "@src/types/api";

/**
 * 2023/04/01 - "이미지.확장자"를 받아서 "경로/이미지_시간.확장자"으로 변경해주는 함수 - by 1-blue
 * 현재 사용하고 있는 s3 폴더 구조는 `"개발모드"/images/이미지파일.확장자` 형태입니다.
 *
 * @param name "이미지.확장자" 형태로 전송
 * @returns "경로/이미지_시간.확장자" 형태로 반환
 */
const convertS3ImagePath = (name: string) => {
  const [filename, ext] = name.split(".");

  return `${process.env.NODE_ENV}/images/${filename}_${Date.now()}.${ext}`;
};

/**
 * 2023/04/01 - S3의 "preSignedURL"을 생성하는 함수 - by 1-blue
 * @param name 이미지 이름  ("이미지.확장자" 형태 )
 * @returns "preSignedURL" 반환
 */
export const getPresignedURL: ApiFetchPresignedURLHandler = async ({
  name,
}) => {
  const photoURL = convertS3ImagePath(name);

  // 20초동안 이미지를 업로드할 수 있는 미리 서명된 URL 생성
  const preSignedURL = S3.getSignedUrl("putObject", {
    // 버킷을 생성할 때 지정한 유니크한 이름
    Bucket: process.env.AWS_S3_BUCKET,
    // 경로 + 파일명
    // ( "image"라는 폴더에 "cat1.jpg"로 저장하고 싶다면 -> "images/cat1.jpg" )
    Key: photoURL,
    // presigendURL 유지 시간 ( 초 )
    Expires: 20,
  });

  // 서명된 URL 반환
  return { preSignedURL };
};
