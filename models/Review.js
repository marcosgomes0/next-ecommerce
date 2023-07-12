import { model, Schema, models  } from "mongoose";

const ReviewSchema = new Schema({
  title: {type: String},
  description: {type: String},
  rate: {type: Number},
  product: {type: Schema.Types.ObjectId},
}, {timestamps: true})


const Review = models?.review  || model('review', ReviewSchema)

export default Review