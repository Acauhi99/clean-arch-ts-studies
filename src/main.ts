import { PrismaClient } from "@prisma/client";
import { CreateLogbookController } from "./logbook/features/create-logbook/CreateLogbookController";
import { CreateLogbookUseCase } from "./logbook/features/create-logbook/CreateLogbookUseCase";
import { GetLogbookController } from "./logbook/features/get-logbook/GetLogbookController";
import { GetLogbookUseCase } from "./logbook/features/get-logbook/GetLogbookUseCase";
import { ApiServer } from "./logbook/shared/ApiServer";
import { PrismaLogbookRepository } from "./logbook/shared/PrismalLogbookRepository";

export async function main(): Promise<void> {
  const client = new PrismaClient();
  const prismaRepository = new PrismaLogbookRepository(client);
  const creatUseCase = new CreateLogbookUseCase(prismaRepository);
  const controller = new CreateLogbookController(creatUseCase);
  const getUseCase = new GetLogbookUseCase(prismaRepository);
  const getController = new GetLogbookController(getUseCase);

  await ApiServer.run(5000, controller, getController);
}

main();
