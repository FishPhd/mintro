declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: number;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_ACCESS_KEY_ID: string;
    S3_BUCKET_IMAGES: string;
  }
}