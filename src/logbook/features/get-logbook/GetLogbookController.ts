import { Request, Response } from "express";
import { GetLogbookUseCase } from "./GetLogbookUseCase";

export class GetLogbookController {
  constructor(private _useCase: GetLogbookUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ error: "ID is required" });
      return;
    }

    try {
      const result = await this._useCase.execute({ id });
      res.status(200).send(result);
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).send({ error: errorMessage });
    }
  }
}
