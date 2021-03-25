import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { ContentTypesEnum } from '../../shared/enums/content-types';

@Controller('api/records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post(':contentType')
  create(@Param('contentType') contentType: ContentTypesEnum, @Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(contentType, createRecordDto);
  }

  @Get(':contentType')
  findAll(@Param('contentType') contentType: ContentTypesEnum, @Query() queryParams) {
    return this.recordsService.findAll(contentType, queryParams);
  }

  @Get(':contentType/:id')
  findOne(@Param('contentType') contentType: ContentTypesEnum, @Param('id') id: string) {
    return this.recordsService.findOne(contentType, id);
  }

  @Put(':contentType')
  update(@Param('contentType') contentType: ContentTypesEnum, @Body() updateRecordDto: UpdateRecordDto) {
    return this.recordsService.update(contentType, updateRecordDto);
  }

  @Delete(':contentType/:id')
  remove(@Param('contentType') contentType: ContentTypesEnum, @Param('id') id: string) {
    return this.recordsService.remove(contentType, id);
  }

  @Delete(':contentType')
  removeAll(@Param('contentType') contentType: ContentTypesEnum) {
    return this.recordsService.removeAll(contentType);
  }
}
