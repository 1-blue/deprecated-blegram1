namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    DATABASE_URL: string;

    ACCESS_SECRET: string;
    REFRESH_SECRET: string;

    AWS_S3_BUCKET: string;
    AWS_S3_REGION: string;
    AWS_S3_ACCESS_KEY: string;
    AWS_S3_ACCESS_SECRET_KEY: string;
  }
}
