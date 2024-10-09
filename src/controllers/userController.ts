import userModel from "../models/userModel"
import bcrypt from 'bcrypt'
import { validateEmail, validatePassword, validateUsername } from "../utils/validUser"
import { getAccessToken } from "../utils/getAccessToken"

export const register = async (req: any, res: any) => {
  const body = req.body
  const { username, email, password } = body

  try {
    // Validate username format
    if (!validateUsername(username)) {
      return res.status(400).json({ message: 'Username must be 3-20 characters long and contain only alphanumeric characters' });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password strength
    if (!validatePassword(password)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      });
    }

    // Check if user exists
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

    // Optionally delete password before returning response
    // delete newUser.password
    const { password: _, ...userWithoutPassword } = newUser.toObject();


    res.status(201).json({
      message: 'Registration successful',
      data: {...userWithoutPassword, token: await getAccessToken({
        _id: userWithoutPassword._id,
        email: userWithoutPassword.email as string,
        rule: 1
      })}
    })


  } catch (error: any) {
    res.status(404).json({
      message: error.message
    })
  }
}


export const signin = async (req: any, res: any) => {
  const body = req.body
  const { email, password } = body

  try {
    // Validate username format
    // if (!validateUsername(username)) {
    //   return res.status(400).json({ message: 'Username must be 3-20 characters long and contain only alphanumeric characters' });
    // }

    // Validate password strength
    // if (!validatePassword(password)) {
    //   return res.status(400).json({
    //     message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    //   });
    // }

    // Check if user exists
    const user: any = await userModel.findOne({email})
    if (user) {
      throw new Error('Account not found. Please check username or password!')
    }

    console.log(user)


    // One-way encryption password
    // const salt = await bcrypt.genSalt(10)
    // const hashpassword = await bcrypt.hash(password, salt)
    // body.password = hashpassword


    // Save data to database
    // const newUser = new userModel(body)
    // await newUser.save()

    // Optionally delete password before returning response
    // delete newUser.password
    const { password: _, ...userWithoutPassword } = user.toObject();


    res.status(200).json({
      message: 'Login successful',
      data: {...userWithoutPassword, token: await getAccessToken({
        _id: userWithoutPassword._id,
        email: userWithoutPassword.email as string,
        rule: userWithoutPassword.rule ?? 1
      })}
    })


  } catch (error: any) {
    res.status(404).json({
      message: error.message
    })
  }
}
