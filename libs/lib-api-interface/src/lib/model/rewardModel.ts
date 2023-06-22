import { RarityEnum, RewardEnum } from '../constants';
import { CategoryEnum } from '../constants/category.enum';
import { TransactionHystory } from './transactionHystoryModel';

export type RewardModel<T> = {
  id: string;
  image: string;
  smallImage?: string;
  name: string;
  userId: string;
  cost: number;
  rarity: RarityEnum;
  category: CategoryEnum;
  createdAt: Date;
  updatedAt: Date;
  rewards?: Array<T>;
  TransactionHystory: TransactionHystory;
  type: RewardEnum;
};
