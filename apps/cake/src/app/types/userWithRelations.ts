import { User, Reward, Platform, Wallet } from '@prisma/client';

type Relations = {
  platforms: Platform[];
  rewards: Reward[];
  wallets: Wallet[];
};

export type UserWithRelations = User & Relations;
