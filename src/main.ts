import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { PORT } from './config/environment'
import { swagger } from './config/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors()

  swagger(app)

  await app.listen(PORT)
}

bootstrap()
