import { CatsRepository } from '@/cats/data';
import { ICreateCat, CatEntity } from '@/cats/domain';
import { v4 } from 'uuid';

export class LocalCatsRepository implements CatsRepository {
  private cats: CatEntity[] = [];
  async create(data: ICreateCat): Promise<CatEntity> {
    const cat = new CatEntity({ ...data, uid: v4() });
    this.cats.push(cat);

    return cat;
  }

  async findAll(): Promise<CatEntity[]> {
    return this.cats;
  }
}
