import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post
} from '@nestjs/common'

import { CreateMovieInput, UpdateMovieInput } from './dto/movie.input'
import { Movie } from './entities/movie.entity'
import { MovieService } from './movie.service'

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @HttpCode(200)
  @Get('')
  async getAll(): Promise<Movie[]> {
    return this.movieService.getAll()
  }

  @HttpCode(200)
  @Get(':title')
  async getOne(@Param('title') title: string): Promise<Movie> {
    return this.movieService.getOne(title)
  }

  @HttpCode(201)
  @Post('')
  async create(@Body() data: CreateMovieInput): Promise<Movie> {
    return this.movieService.create(data)
  }

  @HttpCode(200)
  @Patch('')
  async update(@Body() data: UpdateMovieInput): Promise<Movie> {
    return this.movieService.update(data)
  }

  @HttpCode(200)
  @Delete(':title')
  async delete(@Param('title') title: string): Promise<void> {
    return this.movieService.delete(title)
  }
}
