import { Inject, Injectable } from '@nestjs/common';

import {
  CatEntity,
  CatsRepository,
  CatsRepositoryToken,
  ICreateCat,
} from '@/cats/domain';

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
