import { Inject, Injectable } from '@nestjs/common';

import { CatEntity, ICreateCat } from '@/cats/domain';
import { CatsRepository, CatsRepositoryToken } from '@/cats/data';

import { CreateCatError } from '../errors';

@Injectable()
export class CreateCat {
  constructor(
    @Inject(CatsRepositoryToken)
    private readonly catsRepository: CatsRepository,
  ) {}

  async execute(data: ICreateCat): Promise<CatEntity> {
    const createdCat = await this.catsRepository.create(data);
    if (!createdCat) throw new CreateCatError();

    return createdCat;
  }
}
