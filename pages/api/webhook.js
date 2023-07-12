import { mongooseConnect } from "@/lib/mongoose";
import Stripe from "stripe";
import { buffer } from "micro";
import Order from "@/models/Orders";
const stripe = new Stripe(process.env.STRIPE_SK)
const endpointSecret = "whsec_0ea98afd3c94eadb79ff806e6690f3aeeea977c40f10f0d96ac96ba6d3a27cb4";


export default async function handle (req,res) {
  await mongooseConnect()
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId
      const paid = data.payment_status === 'paid'
      if (orderId && paid){
       await Order.findByIdAndUpdate(orderId,{
          paid: true
        })
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok')
}

export const config = {
  api: {bodyParser: false}
}

// thank-proud-serene-relish   --> Isso foi me dado como um cógido de autenticação para permissão de acesso
// acct_1NKvRMBAD9JJWLxF
// whsec_0ea98afd3c94eadb79ff806e6690f3aeeea977c40f10f0d96ac96ba6d3a27cb4