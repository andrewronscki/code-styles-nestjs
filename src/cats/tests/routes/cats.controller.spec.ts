import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import request from 'supertest';
import { v4 } from 'uuid';

import { AppModule } from '@/shared/presenters';

import { CatsService, CreateCat, FindCats } from '@/cats/data';
import { CatEntity } from '@/cats/domain';
import { CreateCatDto } from '@/cats/presenters';

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

  describe('/cats/use-case (POST)', () => {
    it('201 created', async () => {
      const payload: CreateCatDto = {
        age: 1,
        breed: 'Persa',
        gender: 'M',
        name: 'Happy',
        weight: 8,
      };

      CreateCat.prototype.execute = jest.fn().mockImplementationOnce(
        async () =>
          new CatEntity({
            uid: v4(),
            age: 1,
            breed: 'Persa',
            gender: 'M',
            name: 'Happy',
            weight: 8,
          }),
      );

      const { statusCode, body: response } = await request(app.getHttpServer())
        .post('/cats/use-case')
        .send(payload);

      expect(statusCode).toBe(201);
      expect(response).toHaveProperty('uid');
    });
  });

  describe('/cats/use-case (GET)', () => {
    it('200 success', async () => {
      const data1 = new CatEntity({
        uid: v4(),
        age: 1,
        breed: 'Persa',
        gender: 'M',
        name: 'Happy',
        weight: 11,
      });
      const data2 = new CatEntity({
        uid: v4(),
        age: 2,
        breed: 'Persa',
        gender: 'F',
        name: 'Floopy',
        weight: 13,
      });

      FindCats.prototype.execute = jest
        .fn()
        .mockImplementationOnce(async () => [data1, data2]);

      const { statusCode, body: response } = await request(
        app.getHttpServer(),
      ).get('/cats/use-case');

      expect(statusCode).toBe(200);
      expect(response).toHaveLength(2);
      expect(response[0]).toHaveProperty('uid');
      expect(response[1]).toHaveProperty('uid');
    });

    it('200 success - empty list', async () => {
      FindCats.prototype.execute = jest
        .fn()
        .mockImplementationOnce(async () => []);

      const { statusCode, body: response } = await request(
        app.getHttpServer(),
      ).get('/cats/use-case');

      expect(statusCode).toBe(200);
      expect(response).toHaveLength(0);
    });
  });

  describe('/cats/service (POST)', () => {
    it('201 created', async () => {
      const payload: CreateCatDto = {
        age: 1,
        breed: 'Persa',
        gender: 'M',
        name: 'Happy',
        weight: 8,
      };

      CatsService.prototype.create = jest.fn().mockImplementationOnce(
        async () =>
          new CatEntity({
            uid: v4(),
            age: 1,
            breed: 'Persa',
            gender: 'M',
            name: 'Happy',
            weight: 8,
          }),
      );

      const { statusCode, body: response } = await request(app.getHttpServer())
        .post('/cats/service')
        .send(payload);

      expect(statusCode).toBe(201);
      expect(response).toHaveProperty('uid');
    });
  });

  describe('/cats/service (GET)', () => {
    it('200 success', async () => {
      const data1 = new CatEntity({
        uid: v4(),
        age: 1,
        breed: 'Persa',
        gender: 'M',
        name: 'Happy',
        weight: 11,
      });
      const data2 = new CatEntity({
        uid: v4(),
        age: 2,
        breed: 'Persa',
        gender: 'F',
        name: 'Floopy',
        weight: 13,
      });

      CatsService.prototype.findAll = jest
        .fn()
        .mockImplementationOnce(async () => [data1, data2]);

      const { statusCode, body: response } = await request(
        app.getHttpServer(),
      ).get('/cats/service');

      expect(statusCode).toBe(200);
      expect(response).toHaveLength(2);
      expect(response[0]).toHaveProperty('uid');
      expect(response[1]).toHaveProperty('uid');
    });

    it('200 success - empty list', async () => {
      CatsService.prototype.findAll = jest
        .fn()
        .mockImplementationOnce(async () => []);

      const { statusCode, body: response } = await request(
        app.getHttpServer(),
      ).get('/cats/service');

      expect(statusCode).toBe(200);
      expect(response).toHaveLength(0);
    });
  });
});
