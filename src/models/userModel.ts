import mongoose, { Schema } from "mongoose";

const userScheme = new Schema({
  username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

const userModel = mongoose.model('user', userScheme)
export default userModel