import { Logger } from '@xtool/logger';
import { Prisma } from '@prisma/client';
import { PrismaRepository } from '../../repository/prisma-repository';
import { StatusCode } from 'typescript-openapi-router';
import { UserIdParams } from '@cake/lib-api-interface';
import { UserWithRelations } from '../../types';
import { Request, Response } from 'express';

const userRepository = new PrismaRepository<UserWithRelations>('user');
const userLogger = new Logger('get user by id');

export const getUserById = async (request: Request<UserIdParams>, res: Response): Promise<Response<UserWithRelations>> => {
  const userId = request.params.userId;

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
