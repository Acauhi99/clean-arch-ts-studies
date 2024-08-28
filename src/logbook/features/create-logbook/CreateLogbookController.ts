import { Request, Response } from "express";
import {
  CreateLogbookUseCase,
  ICreateLogbookResult,
} from "./CreateLogbookUseCase";

export class CreatedLogbookDto implements ICreateLogbookResult {
  public readonly logbookId: string;

  public constructor(logbookId: string) {
    this.logbookId = logbookId;
  }
}

export class CreateLogbookController {
  public constructor(private readonly _useCase: CreateLogbookUseCase) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const userId = "userIdFake";

    const result = await this._useCase.execute({
      userId,
      name: req.body.name,
    });

    const response = new CreatedLogbookDto(result.logbookId);

    res.status(201).json(response);
  }
}
