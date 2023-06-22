import { uploadFile, getFileStream } from './utils';
import { unlink } from 'node:fs/promises';
import { Logger } from '@xtool/logger';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { Request, Response } from 'express';
const logger: Logger = new Logger('file service');

export const getImage = async <T>(req: Request<T & { key: string }>, res: Response): Promise<Response> => {
  const { key } = req.params;

  const readStream = await getFileStream(key);

  logger.log(readStream);

  return res.send({
    status: 'success',
    message: 'File uploaded successfully',
    data: readStream,
  });
};

export const uploadImage = async <T>(req: Request<T>): Promise<ManagedUpload.SendData> => {
  const result = await uploadFile(req.file);
  logger.log('S3 response', result.Location);

  //* Deleting from local if uploaded in S3 bucket
  try {
    await unlink('images/' + result.Key);
    logger.log('successfully deleted ' + result.Key);
  } catch (error) {
    logger.error('there was an error:', error.message);
  }

  return result;
};
