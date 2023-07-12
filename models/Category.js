import mongoose, { Schema, model, models} from 'mongoose'

const CategorySchema = new Schema({
  name:  { type: String, required: true},
  parent: {type: mongoose.Types.ObjectId, ref: 'category'},
  properties: [{type: Object}]
})

const Category = models?.category || model('category', CategorySchema)

export default Category