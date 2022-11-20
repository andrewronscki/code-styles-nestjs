import { CatEntity, CatsRepository, ICreateCat } from '@/cats/domain';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
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
