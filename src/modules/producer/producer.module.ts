import { Module } from '@nestjs/common'

import { DatabaseModule } from '@db/db.module'

import { MovieModule } from '@modules/movie/movie.module'

import { ProducerController } from './producer.controller'
import { ProducerService } from './producer.service'

@Module({
  imports: [DatabaseModule, MovieModule],
  controllers: [ProducerController],
  providers: [ProducerService],
  exports: [ProducerService]
})
export class ProducerModule {}
