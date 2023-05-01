import { dbConnect, dbDisconnect } from '@/mongoDB/config/mongoose'
import usersModel from '@/mongoDB/models/usersModel'

dbConnect()
export const config = {
  runtime: 'nodejs',
}

export default async function handler({ method, body: { userName, password } }, res) {
  if (method === "POST") try {
    const newUser = await usersModel.findOne({ userName: userName })
  if(newUser.password === password) return res.status(201).json({_check: true, id: newUser._id})
  }
    catch (error) {
    res.status(500).json({ error: error.message })
  }
  res.status(400).json({ msg: 'Invalid method' })
}

//#region USERS ARRAY DATA API POST
// export default async function handler(req) {
//   if (req.method === 'POST') {
//     const {userName, password} = await req.json()
//     const user = usersDb.find(user => {  
//       return user.userName === userName
//     })
//     if (!user) return new Response(JSON.stringify({ res: 'User not found' }), { status: 404, headers: { 'content-type': 'application/json' } })
//     if (user.password !== password) return new Response(JSON.stringify({ res: 'Password is incorrect' }), { status: 401, headers: { 'content-type': 'application/json' } })
//     // console.log(user)
//     return new Response(JSON.stringify({ res: user.id }), { status: 200, headers: { 'content-type': 'application/json' } })
//   }
// }
//
//#endregion