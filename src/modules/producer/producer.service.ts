import { Injectable } from '@nestjs/common'

import { DatabaseService } from '@db/db.service'

import { Movie } from '@modules/movie/entities/movie.entity'
import { MovieService } from '@modules/movie/movie.service'

@Injectable()
export class ProducerService {
  constructor(
    private readonly db: DatabaseService,
    private readonly movieService: MovieService
  ) {}

  async getAll(): Promise<string[]> {
    const movies = await this.movieService.getAll()

    return Array.from(
      new Set(movies.reduce((acc, winner) => acc.concat(winner.producers), []))
    )
  }

  async getIntervals() {
    const movies = await this.movieService.getAll({ winner: 'yes' })

    const producerIntervals = await this.selectEligibleProducers(movies)

    const min = this.getMinIntervals(producerIntervals)

    const max = this.getMaxIntervals(producerIntervals)

    return { min, max }
  }

  getMinIntervals(
    producerIntervals: {
      producer: string
      minInterval: {
        value: number
        previousWin: number
        followingWin: number
      }
      maxInterval: {
        value: number
        previousWin: number
        followingWin: number
      }
    }[]
  ) {
    let min = []

    producerIntervals.forEach(interval => {
      const parsedInterval = {
        producer: interval.producer,
        interval: interval.minInterval.value,
        previousWin: interval.minInterval.previousWin,
        followingWin: interval.minInterval.followingWin
      }

      if (!min.length || parsedInterval.interval < min[0].interval) {
        min = [parsedInterval]
      } else if (parsedInterval.interval === min[0].interval) {
        min.push(parsedInterval)
      }
    })

    return min
  }

  getMaxIntervals(
    producerIntervals: {
      producer: string
      minInterval: {
        value: number
        previousWin: number
        followingWin: number
      }
      maxInterval: {
        value: number
        previousWin: number
        followingWin: number
      }
    }[]
  ) {
    let max = []

    producerIntervals.forEach(interval => {
      const parsedInterval = {
        producer: interval.producer,
        interval: interval.maxInterval.value,
        previousWin: interval.maxInterval.previousWin,
        followingWin: interval.maxInterval.followingWin
      }

      if (!max.length || parsedInterval.interval > max[0].interval) {
        max = [parsedInterval]
      } else if (parsedInterval.interval === max[0].interval) {
        max.push(parsedInterval)
      }
    })

    return max
  }

  async selectEligibleProducers(movies: Movie[]): Promise<
    {
      producer: string
      minInterval: {
        value: number
        previousWin: number
        followingWin: number
      }
      maxInterval: {
        value: number
        previousWin: number
        followingWin: number
      }
    }[]
  > {
    const producers = await this.getAll()

    const eligible = []

    producers.forEach(producer => {
      const producerMovies = movies.filter(movie =>
        movie.producers.includes(producer)
      )

      if (producerMovies.length > 1) {
        let minInterval: {
          value: number
          previousWin: number
          followingWin: number
        }

        let maxInterval: {
          value: number
          previousWin: number
          followingWin: number
        }

        for (let i = 1; i < producerMovies.length; i++) {
          const interval = {
            value: producerMovies[i].year - producerMovies[i - 1].year,
            previousWin: producerMovies[i - 1].year,
            followingWin: producerMovies[i].year
          }

          if (!minInterval || interval.value < minInterval.value)
            minInterval = interval

          if (!maxInterval || interval.value > maxInterval.value)
            maxInterval = interval
        }

        eligible.push({ producer, minInterval, maxInterval })
      }
    })

    return eligible
  }
}
