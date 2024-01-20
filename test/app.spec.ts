import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'

import { AppModule } from 'src/app.module'

describe('App Module', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('(GET) /healthz', async () => {
    const response = await request(app.getHttpServer()).get('/healthz')

    expect(response.statusCode).toEqual(200)
    expect(response.body).toStrictEqual({
      status: 'ok',
      info: {
        memoryUsed: {
          status: 'up'
        },
        memoryAllocated: {
          status: 'up'
        }
      },
      error: {},
      details: {
        memoryUsed: {
          status: 'up'
        },
        memoryAllocated: {
          status: 'up'
        }
      }
    })
  })
})
