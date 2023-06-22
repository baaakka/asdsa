import { StatusCode } from "typescript-openapi-router";
import { PasswordManager } from "../../controllers/authorization/helpers/password-manager";
import { TokenManager } from "../../controllers/authorization/helpers/token-manager";

import { Logger } from "@xtool/logger";
import { Request, Response } from "express";
import { Prisma, RewardEnum, Token, User } from "@prisma/client";
import { PrismaRepository } from "../../repository/prisma-repository";
import { AuthenticationModel, RegisterRequestBody, RegisterResponseBody, Role } from "@cake/lib-api-interface";
import { RewardsWithRelations } from "../../types/rewardsWithRelations";

const logger = new Logger("apiRegister");
const userRepository = new PrismaRepository("user");
const rewardsRepo = new PrismaRepository<RewardsWithRelations>("reward");

export const apiRegister = async (request: Request<RegisterRequestBody>, res: Response): Promise<Response<RegisterResponseBody>> => {
	const { email, password, role, adminPassword, firstName, lastName, recoveryPhase, username } = request.body;
	const regexPhoneNumber = new RegExp("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$", "im");
	if (role === Role.admin && adminPassword !== process.env.SUPERADMIN_PASSWORD) {
		logger.log("wrong superAdminPassword", adminPassword, process.env.SUPERADMIN_PASSWORD);
		return;
	}

	const [user] = await userRepository.findFirst<Prisma.UserFindFirstArgs>({
		where: {
			email,
		},
	});
	const [usernameExist] = await userRepository.findFirst<Prisma.UserFindFirstArgs>({
		where: {
			username,
		},
	});

	if (user || usernameExist) {
		logger.log("user already exists");
		return res.status(StatusCode.badRequest).json({
			errors: [
				{
					code: "user-exists",
					message: `A user with the email address ${email} already exists`,
				},
			],
		});
	}

	logger.log("creating new user");

	const userRepo: PrismaRepository<User> = new PrismaRepository<User>("user");
	const userData: Prisma.UserCreateArgs = {
		data: {
			email: email,
			password: await PasswordManager.encrypt(password),
			role: role,
			firstName: firstName,
			lastName: lastName,
			recoveryPhase: recoveryPhase,
			username: username,
		},
	};

	if (request.body?.firstName) {
		userData.data.firstName = request.body.firstName;
	}

	if (request.body?.lastName) {
		userData.data.lastName = request.body.lastName;
	}

	if (request.body.phoneNumber) {
		if (!regexPhoneNumber.test(request.body.phoneNumber)) {
			return res.status(StatusCode.badRequest).json({
				errors: [
					{
						message: "Phone Number format error",
					},
				],
			});
		}
		userData.data.phoneNumber = request.body.phoneNumber;
	}

	logger.log("=============================");
	logger.log(JSON.stringify(userData));
	logger.log("=============================");

	const [savedUser, error] = await userRepo.create<Prisma.UserCreateArgs>(userData);
// FOR MVP1
	const [rewardData, rewardError] = await rewardsRepo.findAll<Prisma.RewardFindFirstArgs>({
		where: { userId: '636d58541536eaa1d5a63f67', type: RewardEnum.CAKEBOX },
		select: { id: true },
	});
	
	if(rewardData.length >= 3) {
		for (const rewardId of rewardData.slice(0,3).map(reward => reward.id)) {
			const [,err ] = await rewardsRepo.updateOne<Prisma.RewardUpdateArgs>({
				where: {
					id: rewardId,
				},
				data: {
					isConfectionary: false,
					initial: true,
					User: {
						connect: {
							id: savedUser.id,
						},
					},
				},
			});
			console.log(err);
			
		}
	}

	logger.log("=============================");
	logger.log(JSON.stringify(userData));
	logger.log("=============================");

	if (error) {
		return res.status(StatusCode.badRequest).json(error);
	}

	const { authToken, refreshToken } = TokenManager.sign({
		data: {
			id: String(savedUser.id),
			e: savedUser.email,
			r: savedUser.role,
		},
	});

	const tokenRepo = new PrismaRepository<Token>("token");
	await tokenRepo.create<Prisma.TokenCreateArgs>({
		data: {
			authToken,
			refreshToken,
			userId: savedUser.id,
		},
	});

	logger.log("=============================");
	logger.log("token saved");
	logger.log("=============================");
	const registerUserResponseData: AuthenticationModel = {
		role: savedUser.role as Role,
		authTokenType: "Bearer",
		authToken: authToken,
		refreshToken: refreshToken,
		id: savedUser.id,
	};

	logger.log("=============================");
	logger.log(registerUserResponseData);
	logger.log("=============================");

	return res.status(StatusCode.okay).json({ data: registerUserResponseData });
};
