import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'core/base';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { ParentService } from './parent.service';

@ApiTags('parent')
@Controller('parent')
export class ParentController extends BaseController {
  constructor(public _ss: ParentService) {
    super();
  }
  @Post()
  create(@Body() data: CreateParentDto) {
    return this._ss.createSimple(data);
  }
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateParentDto) {
    return this._ss.updateSimple(id, data);
  }
}
