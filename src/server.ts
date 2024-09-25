import express from 'express'
import { env } from './config/environment'
import mongoose from 'mongoose'
import userRouter from './routers/userRouter'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors())

app.use('/auth', userRouter)

const connectDB = async () => {
  try {
    console.log('Connecting to mongodb...')
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to mongodb!')
  } catch (error) {
    console.log('Cannot connect to database!!!')
  }
}

connectDB()
  .then(() => {
    app.listen(env.APP_PORT, () => {
      console.log(`Hello ${env.AUTHOR}, I am running at ${ env.APP_HOST }:${ env.APP_PORT }/`)
    })
  })
  .catch((error) => {
    console.log(error)
  })


