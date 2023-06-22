import { UserWithRelations } from "./../../types/userWithRelations";
import { Logger } from "@xtool/logger";
import { Prisma } from "@prisma/client";
import { PrismaRepository } from "../../repository/prisma-repository";
import { StatusCode } from "typescript-openapi-router";
import { Request, Response } from "express";
import { ResponseEnvelope } from "@cake/lib-api-interface";

const walletRepository = new PrismaRepository<UserWithRelations>("user");
const logger = new Logger("add wallet");

export const AddWallet = async (request: Request, res: Response): Promise<Response<ResponseEnvelope>> => {
	const userId = request["extra"].userId;
	const { address, type, name } = request.body;
	const [, error] = await walletRepository.updateOne<Prisma.UserUpdateArgs>({
		where: {
			id: userId,
		},
		data: {
			wallets: {
				create: {
					address,
					type,
					name,
				},
			},
		},
	});

	if (error) {
		logger.error("Failed add wallet", error);
		return res.status(StatusCode.badRequest).json({ error });
	}

	return res.status(StatusCode.noContent).json({});
};
