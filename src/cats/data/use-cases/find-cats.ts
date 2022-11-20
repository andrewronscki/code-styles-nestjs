import { Inject, Injectable } from '@nestjs/common';

import { CatEntity, CatsRepository, CatsRepositoryToken } from '@/cats/domain';

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
