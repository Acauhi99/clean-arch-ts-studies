export interface IUseCase<TInput, TOutpout> {
  execute(input: TInput): Promise<TOutpout>;
}
