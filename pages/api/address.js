import { mongooseConnect } from "@/lib/mongoose"
import { getServerSession } from "next-auth"
import { authOp } from "./auth/[...nextauth]"
import Address from "@/models/Address"

export default async function handle (req, res){

  await mongooseConnect()
  const method = req.method
  const { user } = await getServerSession(req, res, authOp )
  if (method === "GET"){
    const getUserEmail = await Address.findOne({userEmail: user.email})
    if (getUserEmail) { 
      res.json(getUserEmail)
    } else {
      res.json()
    }
  }

  if (method === "PUT") {
    const getUserEmail = await Address.findOne({userEmail: user.email})
    if (getUserEmail) {
      const updateAddress = await Address.findByIdAndUpdate(getUserEmail._id, {...req.body} )
      res.json(updateAddress)
    } else {
      const createAddress = await Address.create({userEmail: user.email ,...req.body})
      res.json(createAddress)
    }
  }
}