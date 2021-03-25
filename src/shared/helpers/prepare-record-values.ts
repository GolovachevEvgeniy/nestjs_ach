import { DayTypesEnum } from '../enums/day-types';
import { CreateRecordsValueDto } from '../../modules/records-values/dto/create-records-value.dto';

export const prepareRecordValues = (): CreateRecordsValueDto[] => {
  return Object.values(DayTypesEnum).map((dayType: string) => {
    const data = new CreateRecordsValueDto();

    return {
      ...data,
      dayTypeId: dayType
    }
  });
};
