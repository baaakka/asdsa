import { Logger } from '@xtool/logger';
import { Prisma, Platform } from '@prisma/client';
import { PrismaRepository } from '../../repository/prisma-repository';
import { StatusCode } from 'typescript-openapi-router';
import { Request, Response } from 'express';
import {
  AddPlatformRequestBody,
  ResponseEnvelope,
} from '@cake/lib-api-interface';

const platformRepository = new PrismaRepository<Platform>('platform');
const logger = new Logger('add Platform');

export const addPlatformService = async (
  request: Request<AddPlatformRequestBody>,
  res: Response
): Promise<Response<ResponseEnvelope>> => {
  const userId = request['extra'].userId;
  const { title, link } = request.body;
  const [, error] = await platformRepository.create<Prisma.PlatformCreateArgs>({
    data: {
      User: {
        connect: {
          id: userId,
        },
      },
      title: title,
      isPopular: request.body['isPopular'] ?? false,
      link: link,
    },
  });

  if (error) {
    logger.error('Failed add user platform', error);
    return res.status(StatusCode.badRequest).json({ error });
  }

  return res.status(StatusCode.noContent).json({});
};
