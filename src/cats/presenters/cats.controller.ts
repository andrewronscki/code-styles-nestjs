import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateCat, FindCats } from '../data';
import { CatEntity } from '../domain';
import { LocalCatsRepository } from '../infra';

import { CreateCatDto } from './dtos';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  private catsRepository = new LocalCatsRepository();

  @ApiOperation({ summary: 'Create cat' })
  @ApiCreatedResponse({ description: 'created cat', type: CatEntity })
  @Post()
  async createCat(@Body() payload: CreateCatDto): Promise<CatEntity> {
    return await new CreateCat(this.catsRepository).execute(payload);
  }

  @ApiOperation({ summary: 'Find cats' })
  @ApiOkResponse({ description: 'Found cats', type: CatEntity, isArray: true })
  @Get()
  async findCats(): Promise<CatEntity[]> {
    return await new FindCats(this.catsRepository).execute();
  }
}
