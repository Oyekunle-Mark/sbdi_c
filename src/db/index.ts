import { connect } from 'mongoose'

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOSTNAME, DB_PORT } = process.env
const connectionUrl = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}:${DB_PORT}/${DB_NAME}?authSource=admin`

/**
 * Creates the MongoDB connection
 */
export const createMongoConnection = (): Promise<typeof import('mongoose')> =>
  connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
