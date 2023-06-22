import { Logger } from '@xtool/logger';
import { Prisma } from '@prisma/client';
import { PrismaRepository } from '../../repository/prisma-repository';
import { StatusCode } from 'typescript-openapi-router';
import { GetMeResponseBody, UserIdParams } from '@cake/lib-api-interface';
import { UserWithRelations } from '../../types';
import { Request, Response } from 'express';

const userRepository = new PrismaRepository<UserWithRelations>('user');
const userLogger = new Logger('get user by id');

export const getMe = async (request: Request<UserIdParams>, res: Response): Promise<Response<GetMeResponseBody>> => {
  const userId = request['extra'].userId;

  const [userData, error] = await userRepository.findFirst<Prisma.UserFindFirstArgs>({
    where: {
      id: userId,
    },
  });

  if (error) {
    userLogger.error('Failed get user', error);
    return res.status(StatusCode.badRequest).json({ error });
  }

  return res.status(StatusCode.okay).json({
    data: userData,
  });
};
