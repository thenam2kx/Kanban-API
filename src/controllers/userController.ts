import userModel from "../models/userModel"
import bcrypt from 'bcrypt'

export const register = async (req: any, res: any) => {
  const body = req.body
  const { username, email, password } = body

  try {
    // Check if user exists
    // const user = await userModel.findOne({email})
    const checkEmail = await userModel.findOne({email})
    const checkUsername = await userModel.findOne({username})
    if (checkEmail || checkUsername) {
      throw new Error('Account already exists. Please login!')
    }

    // One-way encryption password
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)
    body.password = hashpassword

    // Save data to database
    const newUser = new userModel(body)
    await newUser.save()

    // Delete password before return
    // delete newUser.password

    res.status(200).json({
      message: 'Registration successful',
      data: body
    })

  } catch (error: any) {
    res.status(404).json({
      message: error.message
    })
  }
}
