import { Controller, Post, Body, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'core/base';


@Controller('school')
@ApiTags('school')
export class SchoolController extends BaseController {
  constructor(public _ss: SchoolService) {
    super()
  }
  @Post()
  create(@Body() data: CreateSchoolDto) {
    return this._ss.createSimple(data);
  }
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateSchoolDto) {
    return this._ss.updateSimple(id, data);
  }
}
