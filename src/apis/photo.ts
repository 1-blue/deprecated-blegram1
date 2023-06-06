import axios from "axios";
import { serverInstance } from ".";

// type
import type {
  ApiUploadPhotoHandler,
  ApiDeletePhotoHandler,
  ApiDeletePhotoResponse,
  ApiFetchPresignedURLHandler,
  ApiFetchPresignedURLResponse,
  ApiUpdatePhotoHandler,
  ApiUpdatePhotoResponse,
  ApiUploadPhotoResponse,
} from "@src/types/api";

/**
 * 2023/04/01 - "presignedURL" 요청 - by 1-blue
 * @param 생성할 이미지 이름
 * @returns 생성된 "presingedURL"
 */
const apiFetchPresignedURL: ApiFetchPresignedURLHandler = async (body) => {
  const { data } = await serverInstance.post<ApiFetchPresignedURLResponse>(
    "/photo",
    body
  );

  return data;
};

/**
 * 2023/04/01 - S3에 이미지 생성 요청 - by 1-blue
 * @param preSignedURL AWS-S3의 presignedURL
 * @param file 입력받은 파일 객체
 * @returns 사용 안 함
 */
const apiUploadPhoto: ApiUploadPhotoHandler = async ({
  presignedURL,
  file,
}) => {
  const { data } = await axios.put<ApiUploadPhotoResponse>(presignedURL, file, {
    headers: { "Content-Type": file.type },
  });

  return data;
};

/**
 * 2023/04/01 - 서버에 이미지 등록 요청 - by 1-blue
 * @param avatar 아바타 URL
 * @returns 사용 안 함
 */
const apiUpdatePhoto: ApiUpdatePhotoHandler = async (body) => {
  const { data } = await serverInstance.patch<ApiUpdatePhotoResponse>(
    "/me/photo",
    body
  );

  return data;
};

// /**
//  * 2023/04/01 - S3에 이미지 제거 요청 - by 1-blue
//  * @param name 삭제할 이미지의 이름
//  * @returns 결과 메시지
//  */
// const apiDeletePhoto: ApiDeletePhotoHandler = async ({ name }) => {
//   const { data } = await serverInstance.delete<ApiDeletePhotoResponse>(
//     `/photo`,
//     { params: { name } }
//   );

//   return data;
// };

/** 2023/04/01 - 이미지 관련된 요청 ( AWS-S3 ) - by 1-blue */
export const apiServicePhoto = {
  /** 2023/04/01 - "presignedURL" 요청 - by 1-blue */
  apiFetchPresignedURL,
  /** 2023/04/01 - S3에 이미지 생성 요청 - by 1-blue */
  apiUploadPhoto,
  /** 2023/04/01 - 서버에 이미지 생성 요청 - by 1-blue */
  apiUpdatePhoto,
  // /** 2023/04/01 - S3에 이미지 제거 요청 - by 1-blue */
  // apiDeletePhoto,
};
