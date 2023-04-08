import type { ApiResponse } from ".";

// ============================== AWS-S3에 이미지들 등록 ==============================
/** 2023/04/08 - AWS-S3에 이미지들 등록 요청 송신 타입 - by 1-blue */
export interface ApiUploadPhotosRequest {
  preSignedURLs: string;
  files: File[];
}
/** 2023/04/08 - AWS-S3에 이미지들 등록 요청 수신 타입 - by 1-blue */
export interface ApiUploadPhotosResponse {}
/** 2023/04/08 - AWS-S3에 이미지들 등록 요청 핸들러 - by 1-blue */
export interface ApiUploadPhotosHandler {
  (body: ApiUploadPhotosRequest): Promise<ApiUploadPhotosResponse>;
}

// ============================== 서버에 이미지들 등록 ==============================
/** 2023/04/08 - 서버에 이미지들 등록 요청 송신 타입 - by 1-blue */
export interface ApiUpdatePhotosRequest {
  avatars: string[];
}
/** 2023/04/08 - 서버에 이미지들 등록 요청 수신 타입 - by 1-blue */
export interface ApiUpdatePhotosResponse extends ApiResponse {}
/** 2023/04/08 - 서버에 이미지들 등록 요청 핸들러 - by 1-blue */
export interface ApiUpdatePhotosHandler {
  (body: ApiUpdatePhotosRequest): Promise<ApiUpdatePhotosResponse>;
}

// ============================== AWS-S3에 이미지들 제거 ==============================
/** 2023/04/08 - AWS-S3에 이미지들 제거 요청 송신 타입 - by 1-blue */
export interface ApiDeletePhotosRequest {
  names: string[];
}
/** 2023/04/08 - AWS-S3에 이미지들 제거 요청 수신 타입 - by 1-blue */
export interface ApiDeletePhotosResponse extends ApiResponse {}
/** 2023/04/08 - AWS-S3에 이미지들 제거 요청 핸들러 - by 1-blue */
export interface ApiDeletePhotosHandler {
  (body: ApiDeletePhotosRequest): Promise<ApiDeletePhotosResponse>;
}
