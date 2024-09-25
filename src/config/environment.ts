import dotenv from 'dotenv'
dotenv.config()

export const env = {
  MONGODB_URI: process.env.MONGODB_URI as string,
  DATABASE_NAME: process.env.DATABASE_NAME as string,
  APP_HOST: process.env.APP_HOST as string,
  APP_PORT: process.env.APP_PORT as string,
  AUTHOR: process.env.AUTHOR as string,
  SECRET_KEY: process.env.SECRET_KEY as string,
}
