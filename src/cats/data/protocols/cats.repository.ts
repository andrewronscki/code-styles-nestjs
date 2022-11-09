import { CatEntity, ICreateCat } from '@/cats/domain';

export const CatsRepositoryToken = Symbol('CatsRepository');
export interface CatsRepository {
  create: (data: ICreateCat) => Promise<CatEntity>;
  findAll: () => Promise<CatEntity[]>;
}
