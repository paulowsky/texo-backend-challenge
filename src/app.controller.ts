import {
  HealthCheckService,
  HealthCheck,
  MemoryHealthIndicator
} from '@nestjs/terminus'

import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private memoryHealth: MemoryHealthIndicator
  ) {}

  @Get('healthz')
  @HealthCheck()
  healthz() {
    const ONE_GB = 1 * 1000 * 1024 * 1024

    return this.health.check([
      () => this.memoryHealth.checkHeap('memoryUsed', ONE_GB),
      () => this.memoryHealth.checkRSS('memoryAllocated', ONE_GB)
    ])
  }
}
