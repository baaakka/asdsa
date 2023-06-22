import { User, Reward, Platform } from '@prisma/client';

type Relations = {
  User: User;
};

export type RewardsWithRelations = Reward & Relations;
