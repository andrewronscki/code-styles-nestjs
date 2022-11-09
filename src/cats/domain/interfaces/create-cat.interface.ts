import { ICat } from './cat.interface';

export interface ICreateCat extends ICat {
  name: string;
  weight: number;
  age: number;
}
