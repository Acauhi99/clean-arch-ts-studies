import { PrismaClient } from "@prisma/client";
import { Logbook } from "../domain/Logbook";
import { ILogbookRepository } from "./ILogbookRepository";

export class PrismaLogbookRepository implements ILogbookRepository {
  public constructor(private readonly _client: PrismaClient) {}

  public async save(logbook: Logbook): Promise<boolean> {
    await this._client.logbook.create({
      data: {
        id: logbook.id,
        name: logbook.name,
        userId: logbook.userId,
      },
    });

    return true;
  }

  public async find(id: string): Promise<Logbook | null> {
    if (!id) {
      throw new Error("ID is required");
    }

    const result = await this._client.logbook.findUnique({
      where: {
        id,
      },
    });

    if (!result) return null;

    return new Logbook(result.userId, result.name, result.id);
  }
}
