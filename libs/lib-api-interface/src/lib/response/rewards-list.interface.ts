import { ResponseEnvelope } from ".";
import { RarityEnum, RewardEnum } from "../constants";
import { CategoryEnum } from "../constants/category.enum";

export interface RewardItem extends ResponseEnvelope {
	image: string;

	smallImage: string;

	name: string;

	id: string;

	isConfectionary: boolean;

	isCakeBox: boolean;

	isOnCakeBox: boolean;

	initial: boolean;

	rarity: RarityEnum;

	category: CategoryEnum;

	cost: number;

	type: RewardEnum;

	userId: string;

	updatedAt: string;

	createdAt: string;

	RewardByIDs: Array<string>;

	rewards: Array<RewardItem>;

	TransactionHystory: Array<TransactionHystory>;
}

type TransactionHystory = {
	id: string;
	createdAt: string;
	amount: number;
	User: { username: string };
};
