import { Platform, Prisma } from "@prisma/client";
import { Logger } from "@xtool/logger";
import { Request, Response } from "express";
import { StatusCode } from "typescript-openapi-router";
import { PrismaRepository } from "../../repository/prisma-repository";
import { queryParamsMapper } from "../../utils";

const rewardsRepository = new PrismaRepository<Platform>("platform");
const logger = new Logger("get platform");

export const GetPlatformById = async (request: Request, res: Response): Promise<Response<unknown>> => {
	const userId = request["extra"].userId;
	let queryParams: Prisma.PlatformFindManyArgs = {};

	if (request?.query) {
		const filterParams: Prisma.PlatformWhereInput = {
			title: "",
			link: "",
		};
		queryParams = queryParamsMapper<Prisma.PlatformFindManyArgs, Prisma.PlatformWhereInput>(request.query, filterParams);
	}

	if (queryParams.where) queryParams.where = { id: userId, ...queryParams.where };
	if (queryParams.orderBy) queryParams.orderBy = { title: "asc" };
	const [rewardData, error] = await rewardsRepository.findAll<Prisma.PlatformFindManyArgs>(queryParams);

	if (error) {
		logger.error("Failed get user platform", error);
		return res.status(StatusCode.badRequest).json({ error });
	}

	return res.status(StatusCode.okay).json({
		data: rewardData,
	});
};
