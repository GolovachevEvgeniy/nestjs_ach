import { CreateRecordDto } from '../../modules/records/dto/create-record.dto';

export const prepareRecord = (): CreateRecordDto => {
  return new CreateRecordDto();
};
