import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

export default {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.controller.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  rootDir: '.',
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths /*, { prefix: '<rootDir>/' } */
  )
}
