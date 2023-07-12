import { mongooseConnect } from "@/lib/mongoose"
import { getServerSession } from "next-auth"
import { authOp } from "./auth/[...nextauth]"
import Review from "@/models/Review"

export default async function handle (req, res){

  await mongooseConnect()
  const method = req.method
  if (method === "POST"){
    const {title, description, rate, product} = req.body
    const productReview = await Review.create({title, description, rate, product})
    res.json(productReview)
  }
}