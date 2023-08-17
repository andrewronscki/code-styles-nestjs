import { Inject, Injectable } from '@nestjs/common';

import { CatEntity } from '@/cats/domain';
import { CatsRepository, CatsRepositoryToken } from '@/cats/data';

@Injectable()
export class FindCats {
  constructor(
    @Inject(CatsRepositoryToken)
    private readonly catsRepository: CatsRepository,
  ) {}
  async execute(): Promise<CatEntity[]> {
    const foundCats = await this.catsRepository.findAll();

    return foundCats;
  }
}
