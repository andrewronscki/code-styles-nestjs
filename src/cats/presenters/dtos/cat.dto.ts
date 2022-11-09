import { ApiProperty } from '@nestjs/swagger';

export class CatDto {
  @ApiProperty({ description: 'Cat breed', example: 'Persa' })
  breed: string;

  @ApiProperty({
    description: 'Cat gender, is female or male',
    example: 'F',
    enum: ['M', 'F'],
  })
  gender: 'M' | 'F';
}
