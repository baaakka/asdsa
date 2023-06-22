import { User, Platform } from '@prisma/client';

type Relations = {
  User: User;
};

export type PlatformWithRelations = Platform & Relations;
