import { Response } from 'express'
import { HttpStatus } from '../config'
import { logger } from './'

/**
 * Builds, logs, and sends the response.
 *
 * @param {Response} res
 * @param {Number} httpStatusCode the status code
 * @param {Boolean} responseType indicates if request was successful or not
 * @param {Object} data the data to be sent over
 */
export const createResponse = (
  res: Response,
  httpStatusCode: number,
  responseType: boolean,
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: object | string
): Response => {
  let responseObject: Record<string, unknown>

  if (responseType) {
    responseObject = {
      status: httpStatusCode,
      data,
    }
  } else {
    responseObject = {
      status: httpStatusCode,
      error: data,
    }
  }

  if (httpStatusCode === HttpStatus.StatusInternalServerError) {
    logger(module).error(JSON.stringify(responseObject))
  } else {
    logger(module).info(JSON.stringify(responseObject))
  }

  return res.status(httpStatusCode).json(responseObject)
}
