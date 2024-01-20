export const testMovie = {
  year: 1999,
  title: 'test',
  studios: ['test'],
  producers: ['test'],
  winner: false
}

export const mockMovieService = {
  getAll: jest.fn().mockReturnValue([testMovie]),
  getOne: jest.fn().mockReturnValue(testMovie),
  create: jest.fn().mockReturnValue(testMovie),
  update: jest.fn().mockReturnValue({ ...testMovie, title: 'edit' }),
  delete: jest.fn()
}

export const testProducerIntervals = { min: [], max: [] }

export const mockProducerService = {
  getIntervals: jest.fn().mockReturnValue([testProducerIntervals])
}
