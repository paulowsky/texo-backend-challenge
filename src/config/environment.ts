import { config } from 'dotenv'

config({
  path: '.env'
})

export const APP_ENV = process.env.APP_ENV || ''
export const APP_URI = process.env.APP_URI || ''
export const PORT = process.env.PORT || ''
