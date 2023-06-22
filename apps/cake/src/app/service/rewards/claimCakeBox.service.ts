import { Prisma, Reward, User } from "@prisma/client";
import { Logger } from "@xtool/logger";
import { Request, Response } from "express";
import { StatusCode } from "typescript-openapi-router";
import { PrismaRepository } from "../../repository/prisma-repository";

const rewardsRepository = new PrismaRepository<Reward>("reward");
const userRepo = new PrismaRepository<User>("user");
const logger = new Logger("get reward");

export const claimCakeBox = async (request: Request, res: Response): Promise<Response<unknown>> => {
	const { cakeboxId } = request.params;
	const { userId } = request["extra"];
	const [cakeboxData, errorGetData] = await rewardsRepository.findFirst<Prisma.RewardFindFirstArgs>({
		where: { id: cakeboxId },
		include: {
			User: {
				select: {
					id: true,
				},
			},
		},
	});

	if (errorGetData) {
		logger.log("Failed get cakebox", errorGetData);
		return res.status(StatusCode.badRequest).json({ error: errorGetData });
	}

	if (cakeboxData.userId !== userId) {
		return res.status(StatusCode.badRequest).json({ error: "You don't have permission to claim this cakebox" });
	}

	await Promise.all(
		cakeboxData.RewardByIDs.map(async (rewardId: string) => {
			const [rewardData] = await rewardsRepository.findFirst<Prisma.RewardFindFirstArgs>({
				where: { id: rewardId },
				select: { cost: true },
			});
			return await rewardsRepository.updateOne<Prisma.RewardUpdateArgs>({
				where: {
					id: rewardId,
				},
				data: {
					User: {
						connect: {
							id: userId,
						},
					},
					TransactionHystory: {
						create: {
							userId: userId,
							amount: rewardData.cost,
						},
					},
					isOnCakeBox: false,
				},
			});
		})
	);

	const [, error] = await rewardsRepository.deleteOne<Prisma.RewardDeleteArgs>({
		where: {
			id: cakeboxId,
		},
	});

	const [userData, errorUserData] = await userRepo.findFirst<Prisma.UserFindFirstArgs>({
		where: { id: userId },
		select: { slicesCollected: true, slicesPurchased: true, totalRewardsEarned: true, cakeBoxClaimed: true },
	});

	if (errorUserData) {
		logger.log("Failed get user data", errorUserData);
		return res.status(StatusCode.badRequest).json({ error });
	}

	const [, errorUpdateUser] = await userRepo.updateOne<Prisma.UserUpdateArgs>({
		where: {
			id: userId,
		},
		data: {
			slicesCollected: userData.slicesCollected + cakeboxData.RewardByIDs.length,
			totalRewardsEarned: userData.totalRewardsEarned + cakeboxData.RewardByIDs.length,
			cakeBoxClaimed: userData.cakeBoxClaimed + 1,
		},
	});

	if (errorUpdateUser) {
		logger.log("Failed update user data", errorUpdateUser);
		return res.status(StatusCode.badRequest).json({ error });
	}

	if (error) {
		logger.error("Failed remove reward", error);
		return res.status(StatusCode.badRequest).json({ error });
	}

	return res.status(StatusCode.noContent).json({});
};
