const { model } = require("mongoose");
const { Schema, models } = require("mongoose");

const AddressSchema = new Schema({
  userEmail: {type: String, unique: true, required: true},
  name: {type: String},
  email: {type: String},
  city: {type: String},
  postalCode: {type: String},
  streetAddress: {type: String},
  country: {type: String},
})

const Address = models?.address || model('address', AddressSchema)

export default Address