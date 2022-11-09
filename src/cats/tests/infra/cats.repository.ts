import { CatsRepository } from '@/cats/data';
import { ICreateCat, CatEntity } from '@/cats/domain';

export class FakeCatsRepository implements CatsRepository {
  async create(data: ICreateCat): Promise<CatEntity> {
    return;
  }

  async findAll(): Promise<CatEntity[]> {
    return;
  }
}
