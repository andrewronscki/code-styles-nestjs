import { Inject, Injectable } from '@nestjs/common';

import { CreateCatError } from '@/cats/data';
import { CatEntity, ICreateCat } from '@/cats/domain';
import { CatsRepository, CatsRepositoryToken } from '@/cats/data';
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
