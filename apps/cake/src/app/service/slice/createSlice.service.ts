import { Logger } from "@xtool/logger";
import { Prisma, Reward, User } from "@prisma/client";
import { PrismaRepository } from "../../repository/prisma-repository";
import { StatusCode } from "typescript-openapi-router";
import { Request, Response } from "express";
import { CreateRewardsRequestBody, ResponseEnvelope } from "@cake/lib-api-interface";
import { uploadImage } from "../files";

const rewardsRepository = new PrismaRepository<Reward>("reward");
const logger = new Logger("Crate Reward");
const userRepo = new PrismaRepository<User>("user");

export const createSliceService = async (
	request: Request<CreateRewardsRequestBody>,
	res: Response
): Promise<Response<ResponseEnvelope>> => {
	const userId = request["extra"].userId;
	const { cost, rarity, category, name } = request.body;
	const image = (await uploadImage<CreateRewardsRequestBody>(request)).Location;

	// const smallImage = (await uploadImage<CreateRewardsRequestBody>(request)).Location;

	const [, error] = await rewardsRepository.create<Prisma.RewardCreateArgs>({
		data: {
			User: {
				connect: {
					id: userId,
				},
			},
			name: name,
			smallImage: image,
			cost: cost,
			rarity: rarity,
			category: category,
			type: "SLICE",
			image,
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
		logger.error("Failed create cakebox", error);
		return res.status(StatusCode.badRequest).json({ error });
	}

	return res.status(StatusCode.created).json({});
};
