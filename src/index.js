import '@babel/polyfill'
import { config } from 'dotenv'
config({ path: 'src/config/env/.env' })

const server = require('./config/server.js')

server.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running on ${
      process.env.NODE_ENV
    } enviroment on uri http://localhost:${process.env.PORT || 3000}`
  )
})
