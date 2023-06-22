import { RewardEnum } from '../constants';

export type CreateCakeBoxRequestBody = {
  userId: string;
  rewardIds: string[];
  name: string;
  cost: number;
  rarity: string;
  category: string;
  type: RewardEnum;
  isConfectionary: boolean;
  image: string;
  smallImage: string;
  isCakeBox: boolean;
};
