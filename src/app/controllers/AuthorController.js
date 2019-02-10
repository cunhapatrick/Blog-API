import Author from '../models/Author'
import redis from 'async-redis'

const client = redis.createClient()

client.on("error", err => console.log("Error " + err))

class AuthorController {
  async index(req,res) {
    const { limit = 20, page = 1 } = req.query
    delete  req.query.limit
    delete  req.query.page

    const filters = req.query || {}
    const cache = await client.get(`authors?page=${page},limit=${limit}`)

    if(cache) {
      return res.status(200).json(JSON.parse(cache))
    } else{
      const docs = await Author.paginate(filters, {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: '-created_at'
      })

      client.set(`authors?page=${page},limit=${limit}`,JSON.stringify(docs))
      client.expire(`authors?page=${page},limit=${limit}`, 20);
      return res.status(200).json(docs)
    }
  }

  async store (req, res) {
    const { email } = req.body

    if (await Author.findOne({ email })) {
      return res.status(400).json({ error: 'Author already exists' })
    }

    const author = await Author.create(req.body)
    return res.status(201).json(author)
  }

  async show(req,res){
    const author = await Author.findById(req.params.id)
    return res.status(200).json(author)
  }

  async update(req,res){
    return res.status(200).json({
      doc: await Author.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
    })
  }

  async destroy(req,res){
    await Author.findByIdAndDelete(req.params.id)
    return res.status(200).send()
  }
}

module.exports = new AuthorController()
