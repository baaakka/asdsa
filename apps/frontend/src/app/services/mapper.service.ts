import { Injectable } from '@angular/core';
import { RewardItem, UserProfile } from '@cake/lib-api-interface';
import { CakeBox } from '../core/types/cakebox.interface';

@Injectable({
  providedIn: 'root',
})
export class MapperService {
  cakeboxMapper(cakebox: RewardItem): CakeBox {
    const { smallImage, image, rarity, rewards } = cakebox;
    return {
      smallImage,
      image,
      rarity,
      rewards: rewards.map(reward => ({ image: reward.smallImage || reward.image })),
    }
  }

  userProfileMapper(userProfile: UserProfile) {
    const { slicesCollected, slicesPurchased, slicesSold, cakeBoxClaimed, totalRewardsEarned } = userProfile;

    return [
      {
        label: 'Slices collected',
        value: slicesCollected 
      },
      {
        label: 'Slices purchased',
        value: slicesPurchased 
      },
      {
        label: 'Slices sold',
        value: slicesSold 
      },
      {
        label: 'Cak3boxes claimed',
        value: cakeBoxClaimed 
      },
      {
        label: 'Total rewards earned',
        value: totalRewardsEarned 
      }
    ]
  }
}
