/** 2023/04/01 - S3에 presignedURL api 요청 수신 타입 ( Server -> S3 ) - 1-blue */
export interface ApiFetchPresignedURLRequest {
  name: string;
}
/** 2023/04/01 - S3에 presignedURL api 요청 송신 타입 ( S3 -> Server  ) - 1-blue */
export interface ApiFetchPresignedURLResponse {
  presignedURL: string;
}
/** 2023/04/01 - S3에 presignedURL API 요청 함수 시그니처 ( "S3" ) - 1-blue */
export interface ApiFetchPresignedURLHandler {
  (body: ApiFetchPresignedURLRequest): Promise<ApiFetchPresignedURLResponse>;
}

/** 2023/04/08 - S3에 presignedURL들 api 요청 수신 타입 ( Server -> S3 ) - 1-blue */
export interface ApiFetchPresignedURLsRequest {
  names: string[];
}
/** 2023/04/08 - S3에 presignedURL들 api 요청 송신 타입 ( S3 -> Server  ) - 1-blue */
export interface ApiFetchPresignedURLsResponse {
  presignedURLs: string[];
}
/** 2023/04/08 - S3에 presignedURL들 API 요청 함수 시그니처 ( "S3" ) - 1-blue */
export interface ApiFetchPresignedURLsHandler {
  (body: ApiFetchPresignedURLsRequest): Promise<ApiFetchPresignedURLsResponse>;
}
