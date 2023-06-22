import { UserWithRelations } from "./../../types/userWithRelations";
import { Logger } from "@xtool/logger";
import { Prisma } from "@prisma/client";
import { PrismaRepository } from "../../repository/prisma-repository";
import { StatusCode } from "typescript-openapi-router";
import { Request, Response } from "express";
import { ResponseEnvelope } from "@cake/lib-api-interface";

const walletRepository = new PrismaRepository<UserWithRelations>("user");
const logger = new Logger("get wallet");

export const GetWallet = async (request: Request, res: Response): Promise<Response<ResponseEnvelope>> => {
	const userId = request["extra"].userId;

	const [data, error] = await walletRepository.findFirst<Prisma.UserFindFirstArgs>({
		where: {
			id: userId,
		},
		select: {
			wallets: {
				select: {
					address: true,
					type: true,
					name: true,
					id: true,
				},
			},
		},
	});

	if (error) {
		logger.error("Failed get wallet", error);
		return res.status(StatusCode.badRequest).json({ error });
	}

	return res.status(StatusCode.okay).json({ data });
};
