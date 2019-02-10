import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate'

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
    required: true
  },
  context: {
    type: String,
    required: true
  },
  authors: {
    type: Array,
    required: true
  },
  permalink: {
    type: String,
    unique: true
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

articleSchema.plugin(paginate)

articleSchema.post('save',async function(doc){
  this.updateOne({_id:doc._id},{
    $set:{
      permalink: `/articles/${doc._id}`
    }
  })


})

articleSchema.pre('findByIdAndUpdate', async function(){
  await this.updateOne({},{
    $set:{
      updated_at: new Date()
    }
  })
})

export default model('Article', articleSchema)
