import { CatEntity, ICreateCat } from '@/cats/domain';

export interface CatsRepository {
  create: (data: ICreateCat) => Promise<CatEntity>;
  findAll: () => Promise<CatEntity[]>;
}
