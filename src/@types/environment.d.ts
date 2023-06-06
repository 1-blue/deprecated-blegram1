namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    BASE_URL: string;

    DATABASE_URL: string;

    ACCESS_SECRET: string;
    REFRESH_SECRET: string;

    AWS_S3_BUCKET: string;
    AWS_S3_REGION: string;
    AWS_S3_ACCESS_KEY: string;
    AWS_S3_ACCESS_SECRET_KEY: string;
  }
}
