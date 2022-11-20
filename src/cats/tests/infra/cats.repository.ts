import { CatEntity, CatsRepository, ICreateCat } from '@/cats/domain';

export class FakeCatsRepository implements CatsRepository {
  async create(data: ICreateCat): Promise<CatEntity> {
    return;
  }

  async findAll(): Promise<CatEntity[]> {
    return;
  }
}
