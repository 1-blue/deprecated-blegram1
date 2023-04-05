import AWS from "aws-sdk";

/** 2023-04-01 - "AWS-S3"에 접근하기 위한 세팅 - by 1-blue */
AWS.config.update({
  region: process.env.AWS_S3_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_ACCESS_SECRET_KEY,
});

/** 2023/04/01 - "AWS-S3"의 접근에 사용하는 값 - by 1-blue */
export const S3 = new AWS.S3({
  apiVersion: "2012-10-17",
  signatureVersion: "v4",
});

export * from "./presignedURL";
export * from "./control";
