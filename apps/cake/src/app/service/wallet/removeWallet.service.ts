import { UserWithRelations } from "./../../types/userWithRelations";
import { Logger } from "@xtool/logger";
import { Prisma } from "@prisma/client";
import { PrismaRepository } from "../../repository/prisma-repository";
import { StatusCode } from "typescript-openapi-router";
import { Request, Response } from "express";
import { ResponseEnvelope } from "@cake/lib-api-interface";

const walletRepository = new PrismaRepository<UserWithRelations>("user");
const logger = new Logger("remove wallet");

export const RemoveWallet = async (request: Request, res: Response): Promise<Response<ResponseEnvelope>> => {
	const userId = request["extra"].userId;
	const { id } = request.params;
	
	const [, error] = await walletRepository.updateOne<Prisma.UserUpdateArgs>({
		where: {
			id: userId,
		},
		data: {
			wallets: {
				delete: {
					id: id,
				},
			},
		},
	});

	if (error) {
		logger.error("Failed remove wallet", error);
		return res.status(StatusCode.badRequest).json({ error });
	}

	return res.status(StatusCode.noContent).json({});
};
