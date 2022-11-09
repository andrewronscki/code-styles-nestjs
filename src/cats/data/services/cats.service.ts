import { Inject, Injectable } from '@nestjs/common';

import {
  CatsRepository,
  CatsRepositoryToken,
  CreateCatError,
} from '@/cats/data';
import { CatEntity } from '@/cats/domain';
@Injectable()
export class CatsService {
  constructor(
    @Inject(CatsRepositoryToken)
    private readonly catsRepository: CatsRepository,
  ) {}

  async create(data: CatsService.CreateCat): Promise<CatEntity> {
    const createdCat = await this.catsRepository.create(data);
    if (!createdCat) throw new CreateCatError();

    return createdCat;
  }

  async findAll(): Promise<CatEntity[]> {
    const foundCats = await this.catsRepository.findAll();

    return foundCats;
  }
}

export namespace CatsService {
  export interface CreateCat {
    age: number;
    breed: string;
    gender: 'M' | 'F';
    name: string;
    weight: number;
  }
}
