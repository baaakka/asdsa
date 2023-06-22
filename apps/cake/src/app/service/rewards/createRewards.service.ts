import { Logger } from "@xtool/logger";
import { Prisma, Reward, RewardEnum, User } from "@prisma/client";
import { PrismaRepository } from "../../repository/prisma-repository";
import { StatusCode } from "typescript-openapi-router";
import { Request, Response } from "express";
import { CreateRewardsRequestBody, ResponseEnvelope } from "@cake/lib-api-interface";

const rewardsRepository = new PrismaRepository<Reward>("reward");
const userRepo = new PrismaRepository<User>("user");
const logger = new Logger("Crate Reward");

export const createRewardsService = async (
	request: Request<CreateRewardsRequestBody>,
	res: Response
): Promise<Response<ResponseEnvelope>> => {
	const userId = request["extra"].userId;
	const { cost, rarity, category, type, name } = request.body;

	if ([RewardEnum.SUGAR].includes(type)) {
		const [sugar, errorSugar] = await userRepo.findFirst<Prisma.UserFindFirstArgs>({
			where: {
				id: userId,
			},
			select: {
				sugar: true,
			},
		});

		if (errorSugar) {
			logger.error("Failed get sugar", errorSugar);
			return res.status(StatusCode.badRequest).json({ error: errorSugar });
		}

		if (sugar.sugar < cost) {
			logger.error("not enough sugar");
			return res.status(StatusCode.badRequest).json({ error: "not enough sugar" });
		}

		const [, errorUser] = await userRepo.updateOne<Prisma.UserUpdateArgs>({
			where: {
				id: userId,
			},
			data: {
				sugar: sugar.sugar - cost,
			},
		});

		if (errorUser) {
			logger.error("Failed update user", errorUser);
			return res.status(StatusCode.badRequest).json({ error: errorUser });
		}

		const [, error] = await rewardsRepository.create<Prisma.RewardCreateArgs>({
			data: {
				User: {
					connect: {
						id: userId,
					},
				},
				smallImage: "https://picsum.photos/800/600",
				name: name,
				category: category,
				type: type,
				rarity: rarity,
				cost: cost,
				//!! TODO: add link for image
				image: "https://picsum.photos/800/600",
			},
		});

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
			logger.error("Failed create rewards", error);
			return res.status(StatusCode.badRequest).json({ error });
		}
	} else {
		const [, error] = await rewardsRepository.create<Prisma.RewardCreateArgs>(request.body);
		if (error) {
			logger.error("Failed create cakebox", error);
			return res.status(StatusCode.badRequest).json({ error });
		}
	}

	return res.status(StatusCode.created).json({});
};
