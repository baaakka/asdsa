import { Prisma, PrismaClient } from "@prisma/client";

let client: PrismaClient;

export const getPrismaClient = (): PrismaClient => {
  const logs: (Prisma.LogLevel | Prisma.LogDefinition)[] = [];
  if (!client) {
    console.log("no prisma client, instantiating");
    client = new PrismaClient({ log: logs });
  }

  client.$on<any>("query", (e: Prisma.QueryEvent | any) => {
    console.log("Query: " + e.query);
    if (e.params.length < 1000000) {
      console.log("Params: " + e.params);
    }
    console.log("Duration: " + e.duration + "ms");
  });
  return client;
};
