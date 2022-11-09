import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CatsController } from './cats.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CatsController],
  providers: [],
})
export class CatsModule {}
