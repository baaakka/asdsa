import { Role } from '.';

export type UserModel = {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  role: Role;
  updatedAt: Date;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  recoveryPhase: string;
  slicesCollected: number;
  slicesPurchased: number;
  slicesSold: number;
  cakeBoxClaimed: number;
  totalRewardsEarned: number;
  avatar: string;
  sugar: number;
  followedByIDs: Array<string>;
  followingIDs: Array<string>;
};
