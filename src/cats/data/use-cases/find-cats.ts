import { CatEntity } from '@/cats/domain';
import { CatsRepository } from '../protocols';

export class FindCats {
  constructor(private readonly catsRepository: CatsRepository) {}

  async execute(): Promise<CatEntity[]> {
    const foundCats = await this.catsRepository.findAll();

    return foundCats;
  }
}
