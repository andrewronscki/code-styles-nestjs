import { CatEntity } from '@/cats/domain';
import { CreateCatError } from '../errors';
import { CatsRepository } from '../protocols';

export class CreateCat {
  constructor(private readonly catsRepository: CatsRepository) {}

  async execute(data: CreateCat.Request): Promise<CatEntity> {
    const createdCat = await this.catsRepository.create(data);
    if (!createdCat) throw new CreateCatError();

    return createdCat;
  }
}

export namespace CreateCat {
  export interface Request {
    age: number;
    breed: string;
    gender: 'M' | 'F';
    name: string;
    weight: number;
  }
}
