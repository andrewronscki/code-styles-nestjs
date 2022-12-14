import { ICreateCat } from '@/cats/domain';
import { ApiProperty } from '@nestjs/swagger';
import { CatDto } from './cat.dto';

export class CreateCatDto extends CatDto implements ICreateCat {
  @ApiProperty({ description: 'Cat age in years', example: 2 })
  age: number;

  @ApiProperty({ description: 'Cat name', example: 'Happy' })
  name: string;

  @ApiProperty({ description: 'Cat weight, in pounds', example: 11 })
  weight: number;
}
