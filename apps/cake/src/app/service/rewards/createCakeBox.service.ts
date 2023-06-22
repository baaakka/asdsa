import { Reward, Prisma, User } from "@prisma/client";
import { PrismaRepository } from "./../../repository/prisma-repository";
import { StatusCode } from "typescript-openapi-router";
import { Response, Request } from "express";
import { CreateCakeBoxRequestBody, ResponseEnvelope } from "@cake/lib-api-interface";
import { uploadImage } from "..";
import { Logger } from "@xtool/logger";

const logger = new Logger("create cake box");
const cakeBoxRepository = new PrismaRepository<Reward>("reward");
const userRepo = new PrismaRepository<User>("user");

export const createCakeBoxService = async (req: Request<CreateCakeBoxRequestBody>, res: Response): Promise<Response<ResponseEnvelope>> => {
	const { body } = req;
	const userId = req["extra"].userId;
	const { rewardIds, name, cost, rarity, category, type, isConfectionary } = body;

	const image = (await uploadImage<CreateCakeBoxRequestBody>(req)).Location;

	const [rewards, rewardError] = await cakeBoxRepository.findAll<Prisma.RewardFindManyArgs>({
		where: {
			id: {in: rewardIds.split(";")},
		},
		select: {
			userId: true,
		},
	});

	if (rewardError) {
		logger.error(rewardError);
		return res.status(StatusCode.internalServerError).json({
			message: "Server error",
		});
	}

	for (const reward of rewards) {
		if (reward.userId !== userId) {
			return res.status(StatusCode.forbidden).json({
				message: "You can't add other user's reward to your cakebox",
			});
		}
	}

	const [cakeBox, error] = await cakeBoxRepository.create<Prisma.RewardCreateArgs>({
		data: {
			User: {
				connect: {
					id: userId,
				},
			},
			isCakeBox: true,
			image,
			smallImage: image,
			name: name,
			cost: Number(cost),
			rarity,
			category,
			type,
			isConfectionary: Boolean(isConfectionary),
		},
	});

	for (const rewardId of rewardIds.split(";")) {
		await cakeBoxRepository.updateOne<Prisma.RewardUpdateArgs>({
			where: {
				id: cakeBox.id,
			},
			data: {
				RewardBy: {
					connect: {
						id: rewardId,
					},
				},
			},
		});
		await cakeBoxRepository.updateOne<Prisma.RewardUpdateArgs>({
			where: {
				id: rewardId,
			},
			data: {
				isOnCakeBox: true,
			},
		});
	}

	const [userData, errorUserData] = await userRepo.findFirst<Prisma.UserFindFirstArgs>({
		where: { id: userId },
		select: { totalRewardsEarned: true },
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
			totalRewardsEarned: userData.totalRewardsEarned + 1,
		},
	});

	if (errorUpdateUser) {
		logger.log("Failed update user data", errorUpdateUser);
		return res.status(StatusCode.badRequest).json({ error });
	}

	if (error) {
		logger.error("Failed create CakeBox", error);
		return res.status(StatusCode.internalServerError).json(error);
	}
	return res.status(StatusCode.noContent).json(cakeBox);
};
