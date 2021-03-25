import { Module } from '@nestjs/common';
import { RecordsValuesService } from './records-values.service';
import { RecordsValuesController } from './records-values.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordValue, RecordValueSchema } from './schemas/record-value.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RecordValue.name, schema: RecordValueSchema }
    ])
  ],
  controllers: [
    RecordsValuesController
  ],
  providers: [
    RecordsValuesService,
  ],
  exports: [
    RecordsValuesService
  ]
})
export class RecordsValuesModule {}
