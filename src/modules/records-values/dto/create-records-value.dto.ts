import { Record } from '../../records/schemas/record.schema';

export class CreateRecordsValueDto {
  public _id: any = null;
  public value: string = '';
  public time: string = '';
  public description: string = '';
  public dayTypeId: string = '';
  public record: Record = null;
}
