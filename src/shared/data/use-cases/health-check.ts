import { IHealthCheck } from '@/shared/domain';

export class HealthCheck {
  execute(): IHealthCheck {
    return {
      uptime: process.uptime(),
      env: process.env.NODE_ENV,
    };
  }
}
