import { CatEntity, ICreateCat } from '@/cats/domain';
import { CatsRepository } from '@/cats/data';

export class FakeCatsRepository implements CatsRepository {
  async create(data: ICreateCat): Promise<CatEntity> {
    return;
  }

  async findAll(): Promise<CatEntity[]> {
    return;
  }
}
