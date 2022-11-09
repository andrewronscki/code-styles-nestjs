import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { HealthCheck } from '@/shared/data';
import { IHealthCheck } from '@/shared/domain';

@ApiTags('healthcheck')
@Controller()
export class AppController {
  @ApiOperation({ summary: 'Health check' })
  @Get('healthcheck')
  healthcheck(): IHealthCheck {
    return new HealthCheck().execute();
  }
}
