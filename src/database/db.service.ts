import { Injectable } from '@nestjs/common'

import * as csvdb from 'csv-database'

export interface DatabaseMovie {
  year: string
  title: string
  studios: string
  producers: string
  winner: string
}

@Injectable()
export class DatabaseService {
  private db: any

  constructor() {
    this.initDatabase('movielist.csv', [
      'year',
      'title',
      'studios',
      'producers',
      'winner'
    ])
  }

  private async initDatabase(fileName: string, model: string[]) {
    this.db = await csvdb(fileName, model)
  }

  async findAllMovies(
    filter?: Partial<DatabaseMovie>
  ): Promise<DatabaseMovie[]> {
    return this.db.get(filter)
  }

  async createMovie(data: DatabaseMovie): Promise<void> {
    await this.db.add(data)
  }

  async updateMovie(originalTitle: string, data: DatabaseMovie): Promise<void> {
    await this.db.edit({ title: originalTitle }, data)
  }

  async deleteMovie(title: string): Promise<void> {
    await this.db.delete({ title })
  }
}
