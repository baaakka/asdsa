import { config } from 'dotenv';
config();

export const bucketName: string | undefined = (process.env as {AWS_BUCKET_NAME: string}).AWS_BUCKET_NAME;
export const region: string | undefined = (process.env as {AWS_BUCKET_REGION: string}).AWS_BUCKET_REGION;
export const accessKeyId: string | undefined = (process.env as {AWS_ACCESS_KEY: string}).AWS_ACCESS_KEY;
export const secretAccessKey: string | undefined = (process.env as {AWS_SECRET_KEY: string}).AWS_SECRET_KEY;
