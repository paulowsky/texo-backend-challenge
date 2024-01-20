import { ApiProperty } from '@nestjs/swagger'

export class Movie {
  @ApiProperty()
  year: number

  @ApiProperty()
  title: string

  @ApiProperty()
  studios: string[]

  @ApiProperty()
  producers: string[]

  @ApiProperty()
  winner: boolean

  constructor(data: Partial<Movie>) {
    Object.assign(this, data)
  }
}
