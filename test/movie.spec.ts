import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'

import { MovieController } from '@modules/movie/movie.controller'
import { MovieService } from '@modules/movie/movie.service'

import { mockMovieService, testMovie } from './fixtures/mocks'

describe('Movie Module', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: mockMovieService
        }
      ]
    }).compile()

    app = moduleFixture.createNestApplication()

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('(GET) /movie', async () => {
    const response = await request(app.getHttpServer()).get('/movie')

    expect(response.statusCode).toEqual(200)
    expect(response.body).toMatchSnapshot()
  })

  it('(GET) /movie/:title', async () => {
    const response = await request(app.getHttpServer()).get(
      `/movie/${testMovie.title}`
    )

    expect(response.statusCode).toEqual(200)
    expect(response.body).toMatchSnapshot()
  })

  it('(POST) /movie', async () => {
    const response = await request(app.getHttpServer())
      .post('/movie')
      .send(testMovie)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toMatchSnapshot()
  })

  it('(PATCH) /movie', async () => {
    const response = await request(app.getHttpServer())
      .patch('/movie')
      .send({ ...testMovie, title: 'edit', originalTitle: testMovie.title })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toMatchSnapshot()
  })

  it('(DELETE) /movie/:title', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/movie/${testMovie.title}`
    )

    expect(response.statusCode).toEqual(200)
    expect(response.body).toMatchSnapshot()
  })
})
