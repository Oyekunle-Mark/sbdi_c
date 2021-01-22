import express from 'express'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rTracer from 'cls-rtracer'

// const { createResponse } = require('./common');
// const {
//   HttpStatusCode,
//   ResponseStatus,
//   ResponseCodes,
// } = require('./config');

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
server.use(morgan(morganFormat))
morgan.token('requestId', (): string => <string>rTracer.id())

server.use(helmet())
server.use(compression())
server.use(cors())

// server.get('/api', (_, res) => createResponse(
//   res,
//   HttpStatusCode.STATUS_OK,
//   ResponseStatus.SUCCESS,
//   ResponseCodes.GEN001.CODE,
//   'Server is up!',
// ));
//
// server.use((_, res) => createResponse(
//   res,
//   HttpStatusCode.STATUS_RESOURCE_NOT_FOUND,
//   ResponseStatus.FAILURE,
//   ResponseCodes.GEN001.CODE,
//   'That URL does not exist over here, mate.',
// ));

export default server
