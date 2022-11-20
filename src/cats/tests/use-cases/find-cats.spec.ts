import { FindCats } from '@/cats/data';
import { CatEntity, CatsRepository } from '@/cats/domain';

import { FakeCatsRepository } from '../infra';

type SutTypes = {
  sut: FindCats;
  catsRepository: CatsRepository;
};

const makeSut = (): SutTypes => {
  const catsRepository = new FakeCatsRepository();

  const sut = new FindCats(catsRepository);
  return { sut, catsRepository };
};

describe('Find cats use case', () => {
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

    const response = await sut.execute();

    expect(response.length).toBe(2);
  });
});
