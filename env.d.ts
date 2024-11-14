declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_URL: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_S3_REGION: string;
    AWS_BUCKET_NAME: string;
  }
}
