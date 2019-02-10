import Author from '../models/Author'

class SessionController {
  async store (req, res) {
    const { email , password } = req.body
    const author = await Author.findOne({ email })
    if (!author) {
      return res.status(400).json({ error: 'Author not found' })
    }

    if (!(await author.compareHash(password))) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    return res.json({ author, token: Author.generateToken(author) })
  }
}

module.exports = new SessionController()
