import { RewardItem } from "@cake/lib-api-interface";
import { Prisma, Reward } from "@prisma/client";
import { Logger } from "@xtool/logger";
import { Request, Response } from "express";
import { StatusCode } from "typescript-openapi-router";
import { PrismaRepository } from "../../repository/prisma-repository";
import { rewardMapper } from "../../utils";

const rewardsRepository = new PrismaRepository<Reward>("reward");
const logger = new Logger("get reward");

export const getRewardById = async (request: Request, res: Response): Promise<Response<unknown>> => {
	const { rewardId } = request.params;

	const [rewardData, error] = await rewardsRepository.findFirst<Prisma.RewardFindFirstArgs>({
		where: {
			id: rewardId,
		},
		include: { TransactionHystory: { where: { rewardId }, include: { User: { select: { username: true } } } } },
	});

	const [rewardListData, errorRewardListData] = await rewardsRepository.findAll<Prisma.RewardFindManyArgs>({
		where: {
			id: { in: rewardData.RewardByIDs },
		},
	});

	if (error) {
		logger.error("Failed get reward", error);
		return res.status(StatusCode.badRequest).json({ error });
	}

	if (errorRewardListData) {
		logger.error("Failed get reward", errorRewardListData);
		return res.status(StatusCode.badRequest).json({ error: errorRewardListData });
	}

	return res.status(StatusCode.okay).json({
		data: rewardMapper(rewardData as unknown as RewardItem, rewardListData as unknown as Array<RewardItem>),
	});
};
