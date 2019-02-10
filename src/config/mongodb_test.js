import { connect, connection } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

// List your collection names here
const COLLECTIONS = []

class DBManager {
  constructor () {
    this.db = null
    this.server = new MongoMemoryServer()
    this.connection = null
  }

  async start () {
    const url = await this.server.getConnectionString()
    connect(url, { useNewUrlParser: true })
    this.db = connection
  }

  stop () {
    this.connection.close()
    return this.server.stop()
  }

  cleanup () {
    return Promise.all(COLLECTIONS.map(c => this.db.collection(c).remove({})))
  }
}

module.exports = new DBManager()
