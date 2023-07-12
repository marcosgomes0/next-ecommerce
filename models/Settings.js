import mongoose, { Schema, model, models} from 'mongoose'

const SettingsSchema = new Schema({
  name: {type: String},
  featured: {type: mongoose.Types.ObjectId, ref: 'product'}
})

const Settings = models?.settings || model('settings', SettingsSchema)
export default Settings