import { Injectable, NotFoundException } from '@nestjs/common'

import { DatabaseMovie, DatabaseService } from '@db/db.service'

import { CreateMovieInput, UpdateMovieInput } from './dto/movie.input'

@Injectable()
export class MovieService {
  constructor(private readonly db: DatabaseService) {}

  async getAll(filter?: Partial<DatabaseMovie>) {
    const result = await this.db.findAllMovies(filter)

    const movies = result.map(movie => ({
      ...movie,
      year: parseInt(movie.year),
      studios: movie.studios.split(', ').map(str => str.trim()),
      producers: movie.producers
        .replace(' and ', ', ')
        .split(', ')
        .map(str => str.trim()),
      winner: movie.winner === 'yes' ? true : false
    }))

    return movies
  }

  async getOne(title: string) {
    const result = await this.getAll({ title })

    if (!result.length) throw new NotFoundException('Movie not found')

    return result[0]
  }

  async create(data: CreateMovieInput) {
    const normalizedData = {
      title: data.title,
      winner: data.winner ? 'yes' : '',
      year: data.year.toString(),
      studios: data.studios.join(', '),
      producers: data.producers.join(', ')
    }

    await this.db.createMovie(normalizedData)

    return await this.getOne(normalizedData.title)
  }

  async update(data: UpdateMovieInput) {
    await this.getOne(data.originalTitle)

    const normalizedData = {
      title: data.title,
      winner: data.winner ? 'yes' : '',
      year: data.year.toString(),
      studios: data.studios.join(', '),
      producers: data.producers.join(', ')
    }

    await this.db.updateMovie(data.originalTitle, normalizedData)

    return await this.getOne(
      normalizedData.title ? normalizedData.title : data.originalTitle
    )
  }

  async delete(title: string) {
    await this.getOne(title)

    await this.db.deleteMovie(title)
  }
}
