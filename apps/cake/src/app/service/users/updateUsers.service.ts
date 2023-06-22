import { Logger } from '@xtool/logger';
import { Prisma } from '@prisma/client';
import { PrismaRepository } from '../../repository/prisma-repository';
import { StatusCode } from 'typescript-openapi-router';
import { ResponseEnvelope, UpdateUserRequestBody } from '@cake/lib-api-interface';
import { UserWithRelations } from '../../types';
import { Request, Response } from 'express';
import { uploadImage } from '..';

const userRepository = new PrismaRepository<UserWithRelations>('user');
const userLogger = new Logger('update user');

export const updateUser = async (request: Request<UpdateUserRequestBody>, res: Response): Promise<Response<ResponseEnvelope>> => {
  const { userId } = request.params;
  const len = request.body.username.lenght;
  if (len < 4 || len > 16) {
    userLogger.error('invalid username', len);
    return res.status(StatusCode.badRequest).json({ error: 'invalid username' });
  }
  if (request.file) {
    request.body.avatar = (await uploadImage<UpdateUserRequestBody>(request)).Location;
  }

  const [, error] = await userRepository.updateOne<Prisma.UserUpdateArgs>({
    where: {
      id: userId,
    },
    data: request.body,
  });

  if (error) {
    userLogger.error('Failed get list of users', error);
    return res.status(StatusCode.badRequest).json({ error });
  }

  return res.status(StatusCode.noContent).json({});
};
