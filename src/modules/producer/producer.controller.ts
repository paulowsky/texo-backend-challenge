import { Controller, Get, HttpCode } from '@nestjs/common'

import { Intervals } from './entities/intervals.entity'

import { ProducerService } from './producer.service'

@Controller('producer')
export class ProducerController {
  constructor(private producerService: ProducerService) {}

  @HttpCode(200)
  @Get('intervals')
  async intervals(): Promise<Intervals> {
    return this.producerService.getIntervals()
  }
}
