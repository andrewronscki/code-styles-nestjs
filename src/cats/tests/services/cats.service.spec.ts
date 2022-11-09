import { v4 } from 'uuid';

import { CatsRepository, CatsService, CreateCatError } from '@/cats/data';
import { CatEntity } from '@/cats/domain';
import { FakeCatsRepository } from '../infra';

type SutTypes = {
  sut: CatsService;
  catsRepository: CatsRepository;
};

const makeSut = (): SutTypes => {
  const catsRepository = new FakeCatsRepository();

  const sut = new CatsService(catsRepository);
  return { sut, catsRepository };
};

describe('CatsService', () => {
  describe('#create', () => {
    it('should not be able create a cat if not return cat from repository', async () => {
      const { sut, catsRepository } = makeSut();

      jest
        .spyOn(catsRepository, 'create')
        .mockImplementationOnce(async () => undefined);

      await expect(
        sut.create({
          age: 1,
          breed: 'Persa',
          gender: 'M',
          name: 'Happy',
          weight: 11,
        }),
      ).rejects.toThrow(CreateCatError);
    });

    it('should be able create cat', async () => {
      const { sut, catsRepository } = makeSut();

      const data: CatsService.CreateCat = {
        age: 1,
        breed: 'Persa',
        gender: 'M',
        name: 'Happy',
        weight: 11,
      };

      jest
        .spyOn(catsRepository, 'create')
        .mockImplementationOnce(
          async () => new CatEntity({ ...data, uid: v4() }),
        );

      const response = await sut.create(data);

      expect(response).toHaveProperty('uid');
      expect(response).toHaveProperty('age');
      expect(response).toHaveProperty('breed');
      expect(response).toHaveProperty('gender');
      expect(response).toHaveProperty('name');
      expect(response).toHaveProperty('weight');
    });
  });

  describe('#findAll', () => {
    it('should be able find cats', async () => {
      const { sut, catsRepository } = makeSut();

      const data1 = new CatEntity({
        age: 1,
        breed: 'Persa',
        gender: 'M',
        name: 'Happy',
        weight: 11,
      });

      const data2 = new CatEntity({
        age: 2,
        breed: 'Persa',
        gender: 'F',
        name: 'Floopy',
        weight: 13,
      });

      jest
        .spyOn(catsRepository, 'findAll')
        .mockImplementationOnce(async () => [data1, data2]);

      const response = await sut.findAll();

      expect(response.length).toBe(2);
    });
  });
});
