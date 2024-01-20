import { ClassSerializerInterceptor, Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { APP_INTERCEPTOR } from '@nestjs/core'

import { ProducerModule } from '@modules/producer/producer.module'
import { MovieModule } from '@modules/movie/movie.module'

import { AppController } from './app.controller'

@Module({
  imports: [TerminusModule, MovieModule, ProducerModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ]
})
export class AppModule {}
