import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CatsService, CreateCat, FindCats } from '../data';

import { CatsController } from './cats.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CatsController],
  providers: [CatsService, CreateCat, FindCats],
})
export class CatsModule {
  static withInfrastructure(
    infrastructure: ModuleMetadata['imports'],
  ): DynamicModule {
    infrastructure = infrastructure ?? [];
    return {
      module: CatsModule,
      imports: [...infrastructure],
    };
  }
}
