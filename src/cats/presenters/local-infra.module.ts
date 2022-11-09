import { Module } from '@nestjs/common';

import { CatsRepositoryToken } from '../data';
import { LocalCatsRepository } from '../infra';

@Module({
  imports: [],
  providers: [
    LocalCatsRepository,
    {
      provide: CatsRepositoryToken,
      useExisting: LocalCatsRepository,
    },
  ],
  exports: [CatsRepositoryToken],
})
export class LocalInfraModule {}
