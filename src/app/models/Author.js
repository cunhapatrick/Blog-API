import { Schema, model } from 'mongoose'
import { sign } from 'jsonwebtoken'
import paginate from 'mongoose-paginate'
const bcrypt = require('bcryptjs')

const authorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

authorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
})

authorSchema.methods.compareHash = function (password) {
  return bcrypt.compare(password, this.password)
}

authorSchema.statics.generateToken = function ({ id }) {
  return sign({ id }, process.env.APP_SECRET, {
    expiresIn: 86400
  })
}

authorSchema.plugin(paginate)

export default model('Author', authorSchema)
