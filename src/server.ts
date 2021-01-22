import express, { Response } from 'express'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rTracer from 'cls-rtracer'
import fs from 'fs'
import path from 'path'
import { createResponse } from './common'
import { HttpStatus, ResponseType } from './config'
import userRoute from './routes/user'

const server = express()

server.use(express.json({ limit: '124kb' }))
server.use(
  express.urlencoded({
    extended: false,
    limit: '124kb',
  })
)

server.use(rTracer.expressMiddleware())

const morganFormat =
  '[:requestId] :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../logs/access.log'),
  { flags: 'a' }
)
server.use(morgan(morganFormat)) // to console
server.use(
  // to file
  morgan(morganFormat, {
    stream: accessLogStream,
  })
)
morgan.token('requestId', (): string => <string>rTracer.id())

server.use(helmet())
server.use(compression())
server.use(cors())

server.get('/api', (_, res: Response) =>
  createResponse(
    res,
    HttpStatus.StatusOk,
    ResponseType.Success,
    'Server is up!'
  )
)

server.use('/api/auth', userRoute)

server.use((_, res: Response) =>
  createResponse(
    res,
    HttpStatus.StatusNotFound,
    ResponseType.Failure,
    'Bad URL, mate!'
  )
)

export default server
