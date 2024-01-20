import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'

import { ProducerController } from '@modules/producer/producer.controller'
import { ProducerService } from '@modules/producer/producer.service'
import { MovieService } from '@modules/movie/movie.service'

import { mockMovieService, mockProducerService } from './fixtures/mocks'

describe('Movie Module', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      controllers: [ProducerController],
      providers: [
        {
          provide: MovieService,
          useValue: mockMovieService
        },
        {
          provide: ProducerService,
          useValue: mockProducerService
        }
      ]
    }).compile()

    app = moduleFixture.createNestApplication()

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('(GET) /producer/intervals', async () => {
    const response = await request(app.getHttpServer()).get(
      '/producer/intervals'
    )

    expect(response.statusCode).toEqual(200)
    expect(response.body).toMatchSnapshot()
  })
})
