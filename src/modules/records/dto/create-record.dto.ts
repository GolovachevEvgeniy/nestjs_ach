import { Types } from 'mongoose';
import { RecordValue } from '../../records-values/schemas/record-value.schema';
import { prepareRecordValues } from '../../../shared/helpers/prepare-record-values';

export class CreateRecordDto {
  public _id: string = null;
  public date: string = '';
  public description: string = '';
  public createdAt: string = new Date().toISOString();
  public updatedAt: string = new Date().toISOString();
  public contentTypeId: string = '';
  public values: RecordValue[] = prepareRecordValues();
}
