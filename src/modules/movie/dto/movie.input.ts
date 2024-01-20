import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'

import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateMovieInput {
  @IsNumber()
  @ApiProperty()
  year: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string

  @IsString({ each: true })
  @ApiProperty({ isArray: true })
  studios: string[]

  @IsString({ each: true })
  @ApiProperty({ isArray: true })
  producers: string[]

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  winner: boolean
}

export class UpdateMovieInput extends PartialType(CreateMovieInput) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  originalTitle: string
}
