import { v4 } from 'uuid';

import { CatsRepository, CreateCat, CreateCatError } from '@/cats/data';
import { CatEntity } from '@/cats/domain';
import { FakeCatsRepository } from '../infra';

type SutTypes = {
  sut: CreateCat;
  catsRepository: CatsRepository;
};

const makeSut = (): SutTypes => {
  const catsRepository = new FakeCatsRepository();

  const sut = new CreateCat(catsRepository);
  return { sut, catsRepository };
};

describe('Cats: create a cat', () => {
  it('should not be able create a cat if not return cat from repository', async () => {
    const { sut, catsRepository } = makeSut();

    jest
      .spyOn(catsRepository, 'create')
      .mockImplementationOnce(async () => undefined);

    await expect(
      sut.execute({
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

    const data: CreateCat.Request = {
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

    const response = await sut.execute(data);

    expect(response).toHaveProperty('uid');
    expect(response).toHaveProperty('age');
    expect(response).toHaveProperty('breed');
    expect(response).toHaveProperty('gender');
    expect(response).toHaveProperty('name');
    expect(response).toHaveProperty('weight');
  });
});
