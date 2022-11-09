import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CatsModule, LocalInfraModule } from '@/cats/presenters';

import { AppController } from './app.controller';
import { AppService } from '../data/services';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CatsModule.withInfrastructure([LocalInfraModule]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
