import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from '@/shared/presenters';

describe('API access', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  describe('/healthcheck (GET)', () => {
    it('200 success', async () => {
      const { statusCode, body: response } = await request(
        app.getHttpServer(),
      ).get('/healthcheck');

      expect(statusCode).toBe(200);
      expect(response.env).toBe('test');
      expect(typeof response.uptime).toBe('number');
    });
  });
});
