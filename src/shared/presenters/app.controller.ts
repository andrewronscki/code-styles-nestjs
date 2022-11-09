import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AppService } from '@/shared/data';
import { HealthCheckEntity } from '@/shared/domain';

@ApiTags('healthcheck')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Health check' })
  @ApiOkResponse({ description: 'checked', type: HealthCheckEntity })
  @Get('healthcheck')
  healthcheck(): HealthCheckEntity {
    return this.appService.healthCheck();
  }
}
