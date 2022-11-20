import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CatsService, CreateCat, FindCats } from '../data';
import { CatEntity } from '../domain';

import { CreateCatDto } from './dtos';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly createCatUseCase: CreateCat,
    private readonly findCatsUseCase: FindCats,
  ) {}

  @ApiOperation({ summary: 'Create cat with use case' })
  @ApiCreatedResponse({ description: 'created cat', type: CatEntity })
  @Post('use-case')
  async createCatWithUseCase(
    @Body() payload: CreateCatDto,
  ): Promise<CatEntity> {
    return await this.createCatUseCase.execute(payload);
  }

  @ApiOperation({ summary: 'Find cats with use case' })
  @ApiOkResponse({ description: 'Found cats', type: CatEntity, isArray: true })
  @Get('use-case')
  async findCatsWithUseCase(): Promise<CatEntity[]> {
    return await this.findCatsUseCase.execute();
  }

  @ApiOperation({ summary: 'Create cat with service' })
  @ApiCreatedResponse({ description: 'created cat', type: CatEntity })
  @Post('service')
  async createCatWithService(
    @Body() payload: CreateCatDto,
  ): Promise<CatEntity> {
    return await this.catsService.create(payload);
  }

  @ApiOperation({ summary: 'Find cats with service' })
  @ApiOkResponse({ description: 'Found cats', type: CatEntity, isArray: true })
  @Get('service')
  async findCatsWithService(): Promise<CatEntity[]> {
    return await this.catsService.findAll();
  }
}
