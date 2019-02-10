import Comment from '../models/Comment'
import redis from 'async-redis'

const client = redis.createClient()
const ObjectId = require('mongoose').Types.ObjectId

client.on("error", err => console.log("Error " + err))

// comment can only be altered and inserted by user that created the comment

class CommentController {
  async index (req, res) {
    const { limit = 20, page = 1 } = req.query
    delete req.query.limit
    delete req.query.page

    const filters = req.query || {}
    const cache = await client.get(`comments?page=${page},limit=${limit}`)

    if(cache) {
      return res.status(200).json(JSON.parse(cache))
    } else{
      const docs = await Comment.paginate(filters, {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: '-created_at'
      })

      client.set(`comments?page=${page},limit=${limit}`,JSON.stringify(docs))
      client.expire(`comments?page=${page},limit=${limit}`, 20);
      return res.status(200).json(docs)
    }
  }

  async show (req, res) {
    return res.status(200).json(await Comment.findById(req.params.id))
  }

  async store (req, res) {
    const doc = await Comment.create(req.body)
    return res.status(201).json(doc)
  }

  async update (req, res) {
    return res.status(200).json({
      doc: await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
    })
  }

  async destroy (req, res) {
    await Comment.findOneAndDelete({ _id: ObjectId(req.params.id), author_id: req.userId })
    return res.status(200).send()
  }
}

module.exports = new CommentController()
