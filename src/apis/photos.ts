import { serverInstance } from ".";
import type {
  ApiFetchPresignedURLsHandler,
  ApiFetchPresignedURLsResponse,
} from "@src/types/api";

/**
 * 2023/04/08 - "presignedURL"들 요청 - by 1-blue
 * @param 생성할 이미지 이름들
 * @returns 생성된 "presingedURL"들
 */
const apiFetchPresignedURLs: ApiFetchPresignedURLsHandler = async (body) => {
  const { data } = await serverInstance.post<ApiFetchPresignedURLsResponse>(
    "/photos",
    body
  );

  return data;
};

/** 2023/04/08 - 이미지들 관련된 요청 ( AWS-S3 ) - by 1-blue */
export const apiServicePhotos = {
  /** 2023/04/08 - "presignedURL"들 요청 - by 1-blue */
  apiFetchPresignedURLs,
};
