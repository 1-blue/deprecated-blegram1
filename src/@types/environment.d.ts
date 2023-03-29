namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    DATABASE_URL: string;

    ACCESS_SECRET: string;
    REFRESH_SECRET: string;
  }
}
