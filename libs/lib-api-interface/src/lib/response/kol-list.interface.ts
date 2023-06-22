import { ResponseEnvelope } from '.';
import { PlatformEnum, RarityEnum } from '../constants';
import { RewardItem } from './rewards-list.interface';

export interface KolListResponse<T> extends ResponseEnvelope {
  //Some properties for pagination
  users: T;
}

export interface KolItem extends ResponseEnvelope {
  user: {
    avatar: string;
    username: string;
    firstName: string;
    lastName: string;
    id: string;
    isFollow: boolean;
  };

  rewards: Array<RewardItem>;

  cakeboxes: Array<{
    rarity: RarityEnum;
    rewards: Array<{
      image: string;
    }>;
  }>;

  followers: number;

  platforms: Array<{
    platform: PlatformEnum;
    isPopular: boolean;
    link: string;
  }>;
}
