import { Router } from "express"
import { signin } from './../controllers/userController'
import { register } from '../controllers/userController'

const userRouter = Router()

userRouter.post('/register', register)
userRouter.post('/signin', signin)

export default userRouter