import { abi, STAKING_CONTRACT } from "@cake/lib-api-interface";
import { UserWithRelations } from "./../../types/userWithRelations";
import { PrismaRepository } from "./../../repository/prisma-repository";
import { Logger } from "@xtool/logger";
import { ethers } from "ethers";
import { Prisma } from "@prisma/client";
import { formatUnits } from "ethers/lib/utils";

const contractAddress = STAKING_CONTRACT;

const logger: Logger = new Logger("contract service");
const contractRepo = new PrismaRepository<UserWithRelations>("user");

export const TransferListener = async (): Promise<void> => {
  const provider = new ethers.providers.WebSocketProvider(process.env.GOERLI_NODE_URL);

  logger.log(await provider.getBlockNumber());

  const contract = new ethers.Contract(contractAddress, abi, provider);

  contract.on("*", async (from) => {
    const [data] = await contractRepo.findFirst<Prisma.UserFindFirstArgs>({
      where: {
        wallets: {
          some: {
            address: from.args[0],
          },
        },
      },
      select: {
        id: true,
        sugar: true,
      },
    });

    switch (formatUnits(from.args[2]._hex, 18)) {
      case "5.0":
        addSugar(data, 1000);
        break;
      case "10.0":
        addSugar(data, 2500);
        break;
      case "20.0":
        addSugar(data, 5000);

        break;
    }

    logger.log(JSON.stringify(data));
  });

  provider.on("block", (el) => logger.log(el));
};

const addSugar = async (userData: { id: string; sugar: number }, sugar: number) => {
  logger.log(userData, sugar);

  await contractRepo.updateOne<Prisma.UserUpdateArgs>({
    where: {
      id: userData.id,
    },
    data: {
      sugar: userData.sugar + sugar,
      TransactionHystory: {
        create: {
          amount: sugar,
        },
      },
    },
  });
};
