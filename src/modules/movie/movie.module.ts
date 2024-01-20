import { Module } from '@nestjs/common'

import { DatabaseModule } from '@db/db.module'

import { MovieController } from './movie.controller'
import { MovieService } from './movie.service'

@Module({
  imports: [DatabaseModule],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService]
})
export class MovieModule {}
