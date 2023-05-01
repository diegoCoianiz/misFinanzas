import { dbConnect } from '@/mongoDB/config/mongoose'
import usersModel from '@/mongoDB/models/usersModel'


dbConnect()
export const config = {
  runtime: 'nodejs',
}

export default async function handler({ method, body: { userName, password } }, res) {
  if (method === "POST") try {
    const newUser = new usersModel({ userName, password })
    const savedUser = await newUser.save()
    return res.status(201).json({_check: true, id: savedUser._id})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
  res.status(400).json({ msg: 'Invalid method' })
}