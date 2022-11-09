import { HealthCheckEntity } from '@/shared/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): HealthCheckEntity {
    return {
      uptime: process.uptime(),
      env: process.env.NODE_ENV,
    };
  }
}
