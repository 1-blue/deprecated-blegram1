import type { ApiResponse } from ".";

// ============================== AWS-S3에 이미지 등록 ==============================
/** 2023/04/01 - AWS-S3에 이미지 등록 요청 송신 타입 - by 1-blue */
export interface ApiUploadPhotoRequest {
  preSignedURL: string;
  file: File;
}
/** 2023/04/01 - AWS-S3에 이미지 등록 요청 수신 타입 - by 1-blue */
export interface ApiUploadPhotoResponse {}
/** 2023/04/01 - AWS-S3에 이미지 등록 요청 핸들러 - by 1-blue */
export interface ApiUploadPhotoHandler {
  (body: ApiUploadPhotoRequest): Promise<ApiUploadPhotoResponse>;
}

// ============================== 서버에 이미지 등록 ==============================
/** 2023/04/01 - 서버에 이미지 등록 요청 송신 타입 - by 1-blue */
export interface ApiUpdatePhotoRequest {
  avatar: string;
}
/** 2023/04/01 - 서버에 이미지 등록 요청 수신 타입 - by 1-blue */
export interface ApiUpdatePhotoResponse extends ApiResponse {}
/** 2023/04/01 - 서버에 이미지 등록 요청 핸들러 - by 1-blue */
export interface ApiUpdatePhotoHandler {
  (body: ApiUpdatePhotoRequest): Promise<ApiUpdatePhotoResponse>;
}

// ============================== AWS-S3에 이미지 제거 ==============================
/** 2023/04/01 - AWS-S3에 이미지 제거 요청 송신 타입 - by 1-blue */
export interface ApiDeletePhotoRequest {
  name: string;
}
/** 2023/04/01 - AWS-S3에 이미지 제거 요청 수신 타입 - by 1-blue */
export interface ApiDeletePhotoResponse extends ApiResponse {}
/** 2023/04/01 - AWS-S3에 이미지 제거 요청 핸들러 - by 1-blue */
export interface ApiDeletePhotoHandler {
  (body: ApiDeletePhotoRequest): Promise<ApiDeletePhotoResponse>;
}
