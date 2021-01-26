import server from './server'
import { createMongoConnection } from './db'
import { logger } from './common'

const { PORT } = process.env

function onListening() {
  logger(module).info(`Listening on ${PORT}`)
}

createMongoConnection()
  .then(() => {
    server.listen(PORT, onListening)
  })
  .catch((err) => logger(module).error(`Error starting server: ${err}`))
