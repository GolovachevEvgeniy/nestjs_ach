import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordsValueDto } from './create-records-value.dto';

export class UpdateRecordsValueDto extends PartialType(CreateRecordsValueDto) {}
