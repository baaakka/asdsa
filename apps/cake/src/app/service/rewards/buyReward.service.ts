import { Prisma, User } from "@prisma/client";
import { Logger } from "@xtool/logger";
import { Request, Response } from "express";
import { StatusCode } from "typescript-openapi-router";
import { PrismaRepository } from "../../repository/prisma-repository";
import { RewardsWithRelations } from "../../types/rewardsWithRelations";

const rewardsRepo = new PrismaRepository<RewardsWithRelations>("reward");
const userRepo = new PrismaRepository<User>("user");
const logger = new Logger("get reward");

export const buyReward = async (request: Request, res: Response): Promise<Response<unknown>> => {
	const { rewardId } = request.params;
	const { userId } = request["extra"];

	const [buyerData, buyerError] = await userRepo.findFirst<Prisma.UserFindFirstArgs>({
		where: { id: userId },
		select: { sugar: true, slicesCollected: true, slicesPurchased: true, totalRewardsEarned: true },
	});

	if (buyerError) {
		logger.log("Failed get buyer", buyerError);
		return res.status(StatusCode.badRequest).json({ error: buyerError });
	}

	const [rewardData, rewardError] = await rewardsRepo.findFirst<Prisma.RewardFindFirstArgs>({
		where: { id: rewardId },
		select: { cost: true, isConfectionary: true, User: { select: { id: true, sugar: true, slicesSold: true, totalRewardsEarned: true } } },
	});

	if (rewardError) {
		logger.log("Failed get reward", rewardError);
		return res.status(StatusCode.badRequest).json({ error: rewardError });
	}

	if (userId === rewardData.User.id) {
		logger.log("You allredy owner");
		return res.status(StatusCode.badRequest).json({ error: "You allredy owner" });
	}

	if (!rewardData.isConfectionary) {
		logger.log("Failed get reward", "Reward is not confectionary");
		return res.status(StatusCode.badRequest).json({ error: "Reward is not in confectionery" });
	}

	if (buyerData.sugar < rewardData.cost) {
		logger.log("Not enough sugar");
		return res.status(StatusCode.badRequest).json({ error: "Not enough sugar" });
	}

	const [, ownerError] = await userRepo.updateOne<Prisma.UserUpdateArgs>({
		where: { id: rewardData.User.id },
		data: {
			sugar: rewardData.cost + rewardData.User.sugar,
			slicesSold: rewardData.User.slicesSold + 1,
		},
	});

	if (ownerError) {
		logger.log("Failed update owner sugar", ownerError);
		return res.status(StatusCode.badRequest).json({ error: ownerError });
	}

	const [, buyerErrors] = await userRepo.updateOne<Prisma.UserUpdateArgs>({
		where: { id: userId },
		data: {
			sugar: buyerData.sugar - rewardData.cost,
			slicesCollected: buyerData.slicesCollected + 1,
			slicesPurchased: buyerData.slicesPurchased + 1,
			totalRewardsEarned: buyerData.totalRewardsEarned + 1,
			TransactionHystory: {
				create: {
					rewardId: rewardId,
					amount: rewardData.cost,
				},
			},
		},
	});

	if (buyerErrors) {
		logger.log("Failed update buyer sugar", buyerErrors);
		return res.status(StatusCode.badRequest).json({ error: buyerErrors });
	}

	const [, error] = await rewardsRepo.updateOne<Prisma.RewardUpdateArgs>({
		where: {
			id: rewardId,
		},
		data: {
			isConfectionary: false,
			User: {
				connect: {
					id: userId,
				},
			},
		},
	});

	if (error) {
		logger.error("Failed get reward", error);
		return res.status(StatusCode.badRequest).json({ error });
	}

	return res.status(StatusCode.okay).json({
		data: rewardData,
	});
};
