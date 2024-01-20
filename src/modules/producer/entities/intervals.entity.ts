import { ApiProperty } from '@nestjs/swagger'

export class Producer {
  @ApiProperty()
  producer: string

  @ApiProperty()
  interval: number

  @ApiProperty()
  previousWin: number

  @ApiProperty()
  followingWin: number

  constructor(data: Partial<Producer>) {
    Object.assign(this, data)
  }
}

export class Intervals {
  @ApiProperty()
  min: Producer[]

  @ApiProperty()
  max: Producer[]

  constructor(data: Partial<Intervals>) {
    Object.assign(this, data)
  }
}
