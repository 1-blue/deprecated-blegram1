import { S3 } from ".";

// type
import type {
  CopyPhotoHandler,
  DeletePhotoHandler,
  MovePhotoHandler,
} from "@src/types";

/**
 * 2023/04/01 - S3 이미지 제거 - by 1-blue
 * @param photo 이미지 파일 이름
 * @returns
 */
const deletePhoto: DeletePhotoHandler = async (name) => {
  await S3.deleteObject(
    {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: name,
    },
    (error, data) => {
      if (error) console.error("S3 이미지 제거 error >> ", error);
    }
  ).promise();
};

/**
 * 2023/04/01 - S3 이미지 복사 ( 이미지 제거에 사용 ) - by 1-blue
 * @param originalSource 이미지 파일 이름
 * @returns void
 */
const copyPhoto: CopyPhotoHandler = async (originalSource) => {
  const firstSlashIndex = originalSource.indexOf("/");
  const secondSlashIndex = originalSource.indexOf("/", firstSlashIndex + 1);

  // 이미지가 복사될 위치
  const key =
    originalSource.slice(0, secondSlashIndex) +
    "/remove" +
    originalSource.slice(secondSlashIndex);

  await S3.copyObject(
    {
      Bucket: process.env.AWS_S3_BUCKET,
      CopySource: process.env.AWS_S3_BUCKET + "/" + originalSource,
      Key: key,
    },
    (error, data) => {
      if (error) console.error("S3 이미지 이동 error >> ", error);
    }
  ).promise();
};

/**
 * 2023/04/01 - S3 이미지 이동 ( 복사 후 제거 ) - by 1-blue
 * @param photo 이미지 파일 이름
 * @returns void
 */
export const movePhoto: MovePhotoHandler = async (name: string) => {
  // AWS-S3의 이미지가 아닌 경우 ( "OAuth" 이미지를 사용하는 경우 )
  if (name.includes("http")) return;

  try {
    // "/remove" 폴더로 복사
    await copyPhoto(name);
    // 기존 위치의 이미지 제거
    await deletePhoto(name);
  } catch (error) {
    console.error("S3 이미지 이동 >> ", error);
  }
};
