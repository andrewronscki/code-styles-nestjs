import { Inject, Injectable } from '@nestjs/common';

import { CreateCatError } from '@/cats/data';
import {
  CatEntity,
  CatsRepository,
  CatsRepositoryToken,
  ICreateCat,
} from '@/cats/domain';
@Injectable()
export class CatsService {
  constructor(
    @Inject(CatsRepositoryToken)
    private readonly catsRepository: CatsRepository,
  ) {}

  async create(data: ICreateCat): Promise<CatEntity> {
    const createdCat = await this.catsRepository.create(data);
    if (!createdCat) throw new CreateCatError();

    return createdCat;
  }

  async findAll(): Promise<CatEntity[]> {
    const foundCats = await this.catsRepository.findAll();

    return foundCats;
  }
}
