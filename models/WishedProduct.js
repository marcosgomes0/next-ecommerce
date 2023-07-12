const { Schema, models, model, default: mongoose } = require("mongoose");

const WishedSchema = new Schema({
  userEmail: { type: String, required: true },
  products: { type: [mongoose.Types.ObjectId]},
});

const Wished = models.wished || model("wished", WishedSchema);

export default Wished