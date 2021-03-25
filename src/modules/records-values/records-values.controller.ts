import { Controller, Get, Param } from '@nestjs/common';
import { RecordsValuesService } from './records-values.service';

@Controller('api/records-values')
export class RecordsValuesController {
  constructor(private readonly recordsValuesService: RecordsValuesService) {}

  @Get()
  findAll() {
    return this.recordsValuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordsValuesService.findOne(id);
  }
}
