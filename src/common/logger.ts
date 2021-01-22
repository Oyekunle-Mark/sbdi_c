import { createLogger, format, transports } from 'winston'
import rTracer from 'cls-rtracer'
import path from 'path'

const { combine, timestamp, label, printf } = format

const getLogLabel = (callingModule: { filename: string }) => {
  const parts = callingModule.filename.split(path.sep)

  return path.join(parts[parts.length - 2], <string>parts.pop())
}

/**
 * Creates a Winston logger object.
 * ### Log Format
 * *| timestamp | request-id | module/filename | log level | log message |*
 *
 * @param {Module} callingModule the module from which the logger is called
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const logger = (callingModule: { filename: string }) =>
  createLogger({
    format: combine(
      label({ label: getLogLabel(callingModule) }),
      timestamp(),
      printf((info) => {
        const rid = rTracer.id()

        return rid
          ? `| ${info.timestamp} | ${rid} | ${info.label} | ${info.level} | ${info.message} |`
          : `| ${info.timestamp} | ${info.label} | ${info.level} | ${info.message} |`
      })
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/combined.log' }),
    ],
    exitOnError: false,
  })
