import server from './server'
import { logger } from './common'

const { PORT } = process.env

function onListening() {
  logger(module).info(`Listening on ${PORT}`)
}

server.listen(PORT, onListening)
