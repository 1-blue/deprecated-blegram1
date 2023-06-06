/** 2023/04/01 - [이미지 패치하는 동안 보여줄 이미지](https://png-pixel.com) - by 1-blue */
export const blurDataURL =
  "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88Pz/fwAJPAPHGezJpAAAAABJRU5ErkJggg==";

/** 2023/04/01 - AWS-S3의 URL로 변환 - by 1-blue */
export const combinePhotoURL = (url: string) =>
  "https://blegram.s3.ap-northeast-2.amazonaws.com/" + url;

/** 2023/04/09 - 하나로 합쳐진 URL "|"를 기준으로 분리 - by 1-blue */
export const splitPhotoURL = (urls: string) => urls.split("|");
