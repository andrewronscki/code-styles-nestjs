import { InvalidParamError } from '@/shared/domain';
import { ApiProperty } from '@nestjs/swagger';

export class CatEntity {
  @ApiProperty()
  public uid?: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public weight: number;

  @ApiProperty()
  public gender: 'M' | 'F';

  @ApiProperty()
  public breed: string;

  @ApiProperty()
  public age: number;

  constructor(data: CatEntity.Data) {
    this.validate(data);
    this.uid = data.uid;
    this.name = data.name;
    this.weight = data.weight;
    this.gender = data.gender;
    this.breed = data.breed;
    this.age = data.age;
  }

  private validate(data: CatEntity.Data): void {
    if (!data.name) throw new InvalidParamError('name');
    if (!data.weight) throw new InvalidParamError('weight');
    if (!data.gender) throw new InvalidParamError('gender');
    if (!data.breed) throw new InvalidParamError('breed');
    if (!data.age) throw new InvalidParamError('age');
  }
}

export namespace CatEntity {
  export interface Data {
    uid?: string;
    name: string;
    weight: number;
    gender: 'M' | 'F';
    breed: string;
    age: number;
  }
}
