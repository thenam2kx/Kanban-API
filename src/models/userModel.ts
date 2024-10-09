import mongoose, { Schema } from "mongoose";

const userScheme = new Schema({
  username: {
    type: String,
    require: true,
    min: [6, 'eejd'],
    max: 12
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  rule: {
    type: Number,
    default: 1
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

const userModel = mongoose.model('users', userScheme)
export default userModel