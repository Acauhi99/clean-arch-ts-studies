import { IUseCase } from "../../../shared/IUseCase";
import { Logbook } from "../../domain/Logbook";

interface ICreateLogbookDto {
  name: string;
  userId: string;
}

export interface ICreateLogbookResult {
  logbookId: string;
}

interface ICreateLogbbok {
  save(logbook: Logbook): Promise<boolean>;
}

export class CreateLogbookUseCase
  implements IUseCase<ICreateLogbookDto, ICreateLogbookResult>
{
  public constructor(private readonly _logbookRepository: ICreateLogbbok) {}

  public async execute(dto: ICreateLogbookDto): Promise<ICreateLogbookResult> {
    const logbook = new Logbook(dto.name, dto.userId);
    const result = await this._logbookRepository.save(logbook);

    if (!result) {
      throw new Error("Logbook could not be saved");
    }

    return {
      logbookId: logbook.id,
    };
  }
}
