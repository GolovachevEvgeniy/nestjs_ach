export class CreateRecordFiltersDtoDto {
  public pageNumber: number;
  public pageSize: number;

  constructor({pageNumber = 0, pageSize = 31 }) {
    this.pageNumber = +pageNumber;
    this.pageSize = +pageSize
  }

  public get skip(): number {
    return this.pageNumber * this.pageSize;
  }
}