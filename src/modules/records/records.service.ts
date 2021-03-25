import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise, Types } from 'mongoose';
import { Record, RecordDocument } from './schemas/record.schema';
import { ContentTypesEnum } from '../../shared/enums/content-types';
import { CreateRecordFiltersDtoDto } from './dto/create-record-filters.dto';
import { RecordsValuesService } from '../records-values/records-values.service';
import { prepareRecord } from '../../shared/helpers/prepare-record';

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record.name) private repository: Model<RecordDocument>,
    private recordsValuesService: RecordsValuesService
  ) {}

  async create(contentType: ContentTypesEnum, createRecordDto: CreateRecordDto) {
    const { values, ...rest } = createRecordDto;
    const objectId = Types.ObjectId();
    const contentValues = await this.recordsValuesService.createMany(objectId, values);
    const content = await new this.repository({
      ...rest,
      _id: objectId,
      contentTypeId: ContentTypesEnum[contentType],
      values: contentValues
    });

    return await content.save();
  }

  async update(contentType: ContentTypesEnum, updateRecordDto: UpdateRecordDto) {
    const { _id, values, ...data } = updateRecordDto;
    const objectId = Types.ObjectId(_id);

    await this.recordsValuesService.updateMany(values);

    return await this.repository.findOneAndUpdate({
      _id: objectId,
      contentTypeId: ContentTypesEnum[contentType]
    }, {
      ...data,
      updatedAt: new Date().toISOString()
    });
  }

  async findAll(contentType: ContentTypesEnum, queryParams) {
    const dataFilters = new CreateRecordFiltersDtoDto(queryParams);

    const dataTotalCount = await this.repository
      .find()
      .where('contentTypeId').equals(ContentTypesEnum[contentType])
      .countDocuments();

    const data = await this.repository
      .find()
      .where('contentTypeId').equals(ContentTypesEnum[contentType])
      .populate('values')
      .sort({ createdAt: -1 })
      .skip(dataFilters.skip)
      .limit(dataFilters.pageSize);

    return {
      paging: {
        pageNumber: dataFilters.pageNumber,
        pageSize  : dataFilters.pageSize,
        totalItemsCount: dataTotalCount
      },
      data: data
    }
  }

  async findOne(contentType: ContentTypesEnum, id: string) {
    if (id === '0') {
      return Promise.resolve(prepareRecord());
    }

    return await this.repository
      .findById(Types.ObjectId(id))
      .where('contentTypeId').equals(ContentTypesEnum[contentType])
      .populate('values')
  }

  async remove(contentType: ContentTypesEnum, id: string) {
    return await this.repository
      .findByIdAndDelete(Types.ObjectId(id))
      .where('contentTypeId').equals(ContentTypesEnum[contentType]);
  }

  async removeAll(contentType: ContentTypesEnum) {
    return await this.repository
      .remove()
      .where('contentTypeId').equals(ContentTypesEnum[contentType]);
  }
}
