import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { INestApplication } from '@nestjs/common/interfaces'

export function swagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Movie Api')
    .setDescription('Worst movie from Golden Raspberry Awards')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/docs/swagger', app, document)
}
