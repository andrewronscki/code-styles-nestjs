import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckEntity {
  @ApiProperty()
  public uptime: number;

  @ApiProperty()
  public env: string;
}
