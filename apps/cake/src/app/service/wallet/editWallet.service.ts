import { UserWithRelations } from "./../../types/userWithRelations";
import { Logger } from "@xtool/logger";
import { Prisma } from "@prisma/client";
import { PrismaRepository } from "../../repository/prisma-repository";
import { StatusCode } from "typescript-openapi-router";
import { Request, Response } from "express";
import { ResponseEnvelope } from "@cake/lib-api-interface";

const walletRepository = new PrismaRepository<UserWithRelations>("user");
const logger = new Logger("edit wallet");

export const EditWallet = async (request: Request, res: Response): Promise<Response<ResponseEnvelope>> => {
	const userId = request["extra"].userId;
	const newWalletData = request.body;
	const { id } = request.body;
	delete newWalletData.id

	const [, error] = await walletRepository.updateOne<Prisma.UserUpdateArgs>({
		where: {
			id: userId,
		},
		data: {
			wallets: {
				update: {
					where: {
						id,
					},
					data: newWalletData
				},
			},
		},
	});

	if (error) {
		logger.error("Failed edit wallet", error);
		return res.status(StatusCode.badRequest).json({ error });
	}

	return res.status(StatusCode.noContent).json({});
};
