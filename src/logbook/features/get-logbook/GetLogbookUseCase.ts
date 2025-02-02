import { IUseCase } from "../../../shared/IUseCase";
import { Logbook } from "../../domain/Logbook";
import { ILogbookRepository } from "../../shared/ILogbookRepository";

interface IGetLogbookDto {
  id: string;
}

export class LogbookDto {
  public constructor(public readonly id: string, public name: string) {}
  public static from(logbook: Logbook): LogbookDto {
    return new LogbookDto(logbook.id, logbook.name);
  }
}

export class GetLogbookUseCase implements IUseCase<IGetLogbookDto, LogbookDto> {
  public constructor(private readonly _logbookRepository: ILogbookRepository) {}

  public async execute(input: IGetLogbookDto): Promise<LogbookDto> {
    const logbook = await this._logbookRepository.find(input.id);

    if (!logbook) {
      throw new Error("Logbook not found");
    }

    return LogbookDto.from(logbook);
  }
}
