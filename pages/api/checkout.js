import { mongooseConnect } from "@/lib/mongoose"
import Order from "@/models/Orders"
import Product from "@/models/Product"
import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { authOp } from "./auth/[...nextauth]";
const stripe = new Stripe(process.env.STRIPE_SK)

export default async function handle(req, res){
  await mongooseConnect()
  const method = req.method
  if(method !== "POST"){
    res.json('Just POST method')
    return
  }

  const {cartProducts, name, email, city, streetAddress, postalCode, country } = req.body

  const productsInfo = await Product.find({_id: cartProducts})
  const productsInfos = JSON.parse(JSON.stringify(productsInfo))
  const session = await getServerSession(req,res,authOp)
  
  let line_items = []
  if (cartProducts && session?.user && productsInfos && productsInfos.length > 0){
    productsInfos.forEach((product)=>{
      const quantity = cartProducts.filter((q)=> q === product._id).length || 0
      if (quantity)
      line_items = [...line_items, {    
        quantity,
        price_data: {
          currency: 'USD',
          product_data: {
            name: product.title
          },
          unit_amount: product.price * 100
        },
      }]
    })
    
    const orderDoc = await Order.create({
      line_items,
      userEmail: session?.user?.email,
      name,
      email,
      city,
      country,
      streetAddress,
      postalCode,
      paid:false,
      userEmail: session?.user?.email
    })

    const stripeSession = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      customer_email: email,
      success_url: process.env.PUBLIC_URL + '/cart?success=1',
      cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
      metadata: {orderId: orderDoc.id.toString()},
    })

    return res.json({
      url: stripeSession.url,
    })

  } else {
    return res.json('login is requerid')
  } 
  
}