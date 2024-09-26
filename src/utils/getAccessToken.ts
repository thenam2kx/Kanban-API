import jwt from 'jsonwebtoken'
import { env } from '../config/environment'
import { Types } from 'mongoose'

export const getAccessToken = async (payload : {
  _id: Types.ObjectId, email: string, rule: number
}) => {
  const token = jwt.sign(payload, env.SECRET_KEY)
  return token
}