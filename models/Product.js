import mongoose, { Schema, model, models} from 'mongoose'

const ProductSchema = new Schema({
  title:  { type: String, required: true},
  description: String,
  price: { type: Number, required: true},
  images: {type: [String]},
  category: {type: mongoose.Types.ObjectId, ref:'category'},
  properties: {type: Object}
})

const Product = models.product || model('product', ProductSchema)

export default Product