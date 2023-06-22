import { RarityEnum } from "@cake/lib-api-interface";

export interface CakeBox {
    smallImage?: string;
    image?: string;
    rarity: RarityEnum;
    rewards: Array<{
      image: string
    }>
  }