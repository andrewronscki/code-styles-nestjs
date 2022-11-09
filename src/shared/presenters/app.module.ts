import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CatsModule } from '@/cats/presenters';

import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot(), CatsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
