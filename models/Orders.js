
import mongoose, { Schema, model, models } from 'mongoose'

const OrderSchema = new Schema({
  line_items: {type: [Object]},
  userEmail: {type: String, required: true},
  name: {type: String},
  email: {type: String},
  city: {type: String},
  postalCode: {type: String},
  streetAddress: {type: String},
  country: {type: String},
  paid: Boolean
}, {
  timestamps: true
})

const Order = models.order || model('order', OrderSchema)

export default Order