import { mongooseConnect } from "@/lib/mongoose"
import Wished from "@/models/WishedProduct"
import { getServerSession } from "next-auth"
import { authOp } from "./auth/[...nextauth]"


export default async function handle (req, res){

  await mongooseConnect()
  const method = req.method
  const response = await getServerSession(req, res, authOp)
  const user = response?.user

  if (user){

    if(method === "GET"){
      const getProducts = JSON.parse(JSON.stringify(await Wished.findOne({userEmail: user.email})))
      res.json(getProducts)
    }

    if (method === "PUT"){
      const getProducts = JSON.parse(JSON.stringify(await Wished.findOne({userEmail: user.email})))
      
      if(getProducts){
        const {_id} = req.body
        const products = getProducts.products?.find((p)=>{
          return p === _id
        })  
        if (products){
          const newUserWisheds = [...getProducts.products]
          const location = getProducts.products?.indexOf(_id)
          newUserWisheds.splice(location, 1)
          const updateWishes = await Wished.findOneAndUpdate({userEmail: user.email}, {products: newUserWisheds})
          res.json(updateWishes)
        } else{
          const newUserWisheds = [...getProducts.products, _id]
          const updateWishes = await Wished.findOneAndUpdate({userEmail: user.email}, {products: newUserWisheds})
          res.json(updateWishes)
        }
      } else {
        const {_id} = req.body
        const createWishProducts = await Wished.create({userEmail: user.email, products: [_id]})
        res.json(createWishProducts)
      }
    }
  } else {
    return res.json()
  }
}