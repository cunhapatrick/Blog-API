import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate'

const ObjectId = require('mongoose').Types.ObjectId

const commentSchema = new Schema({
  context: {
    type: String,
    required: true
  },
  article_id: {
    type: ObjectId,
    required: true
  },
  author_id: {
    type: ObjectId,
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

commentSchema.pre('findByIdAndUpdate', async function(next){
  await this.updateOne({},{updated_at: new Date()})
  next()
})

commentSchema.plugin(paginate)

export default model('Comment', commentSchema)
