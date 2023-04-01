/** 2023/04/01 - S3의 이미지 제거 요청 함수 시그니처 - by 1-blue */
export interface DeletePhotoHandler {
  (name: string): void;
}
/** 2023/04/01 - S3의 이미지 복사 요청 함수 시그니처 - by 1-blue */
export interface CopyPhotoHandler {
  (originalSource: string): void;
}
/** 2023/04/01 - S3의 이미지 이동 요청 함수 시그니처 - by 1-blue */
export interface MovePhotoHandler {
  (name: string): void;
}
