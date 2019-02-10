import Article from '../models/Article'
import redis from 'async-redis'

const client = redis.createClient()
client.on("error", err => console.log("Error " + err))

class ArticleController {
  async index (req, res) {
    const { limit = 20, page = 1 } = req.query
    delete req.query.limit
    delete req.query.page

    const filters = req.query || {}
    const cache = await client.get(`articles?page=${page},limit=${limit}`)

    if(cache) {
      return res.status(200).json(JSON.parse(cache))
    } else{
      const docs = await Article.paginate(filters, {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: '-created_at'
      })

      client.set(`articles?page=${page},limit=${limit}`,JSON.stringify(docs))
      client.expire(`articles?page=${page},limit=${limit}`, 20);
      return res.status(200).json(docs)
    }
  }

  async show (req, res) { return res.status(200).json(await Article.findById(req.params.id)) }

  async store (req, res) {
    if(req.body.authors.length===0) return res.status(403).json({error: "The article has to at least 1 author"})
    const doc = await Article.create(req.body)
    return res.status(201).json(doc)
  }

  async update (req, res) {
    return res.status(200).json({
      doc: await Article.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
    })
  }

  async destroy (req, res) {
    await Article.findOneAndDelete(req.params.id)
    return res.status(200).send()
  }
}

module.exports = new ArticleController()
