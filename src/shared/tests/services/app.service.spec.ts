import { AppService } from '@/shared/data';

type SutTypes = {
  sut: AppService;
};

const makeSut = (): SutTypes => {
  const sut = new AppService();

  return {
    sut,
  };
};

describe('HealthCheck: get the healthcheck application', () => {
  it('should be able return the healthcheck application', () => {
    const { sut } = makeSut();

    const response = sut.healthCheck();

    expect(response.env).toBe('test');
    expect(typeof response.uptime).toBe('number');
  });
});
