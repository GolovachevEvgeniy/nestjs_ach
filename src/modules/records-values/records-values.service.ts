import { Injectable } from '@nestjs/common';
import { CreateRecordsValueDto } from './dto/create-records-value.dto';
import { UpdateRecordsValueDto } from './dto/update-records-value.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RecordValue, RecordValueDocument } from './schemas/record-value.schema';

@Injectable()
export class RecordsValuesService {
  constructor(
    @InjectModel(RecordValue.name) private repository: Model<RecordValueDocument>
  ) {}

  async createMany(objectId: Types.ObjectId, createRecordsValue: CreateRecordsValueDto[]): Promise<CreateRecordsValueDto[]> {
    const content = createRecordsValue.map((values) => {
      return {
        ...values,
        _id: Types.ObjectId(),
        record: objectId
      }
    });

    return this.repository.create(content);
  }

  async updateMany(updateRecordsValue: UpdateRecordsValueDto[]) {
    for (const entity of updateRecordsValue) {
      const { _id, ...data } = entity;

      await this.repository.findOneAndUpdate({
        _id: Types.ObjectId(_id)
      }, {
        ...data,
        updatedAt: new Date().toISOString()
      });
    }
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findOne(Types.ObjectId(id));
  }
}
