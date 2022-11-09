import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CatsService } from '../data';
import { CatEntity } from '../domain';

import { CreateCatDto } from './dtos';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({ summary: 'Create cat' })
  @ApiCreatedResponse({ description: 'created cat', type: CatEntity })
  @Post()
  async createCat(@Body() payload: CreateCatDto): Promise<CatEntity> {
    return await this.catsService.create(payload);
  }

  @ApiOperation({ summary: 'Find cats' })
  @ApiOkResponse({ description: 'Found cats', type: CatEntity, isArray: true })
  @Get()
  async findCats(): Promise<CatEntity[]> {
    return await this.catsService.findAll();
  }
}
