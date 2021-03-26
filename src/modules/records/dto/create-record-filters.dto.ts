export class CreateRecordFiltersDtoDto {
  public pageNumber: number;
  public pageSize: number;

  constructor({pageNumber = 0, pageSize = 31 }) {
    this.pageNumber = typeof pageNumber === 'string' ? +pageNumber : pageNumber;
    this.pageSize = typeof pageSize === 'string' ? +pageSize : pageSize;
  }

  public get skip(): number {
    return this.pageNumber * this.pageSize;
  }
}