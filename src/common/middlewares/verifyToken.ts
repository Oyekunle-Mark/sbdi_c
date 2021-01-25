import { Request, Response, NextFunction } from 'express'
import { verify } from '../../utils'
import { createResponse } from '../.'
import { HttpStatus, ResponseType } from '../../config'

/**
 * Middleware to check if client has an active token
 *
 * @param {Request} req the request body
 * @param {Response} res the response body
 * @param {NextFunction} next called to move to the next middleware in the chain
 * @return {Promise<Response | void>}
 */
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const authHeader = req.get('Authorization')

    if (!authHeader)
      return createResponse(
        res,
        HttpStatus.StatusUnauthorized,
        ResponseType.Failure,
        'Please provide an authorization header'
      )

    const [prefix, token] = authHeader.split(' ')

    if (prefix !== 'Bearer' || !token)
      return createResponse(
        res,
        HttpStatus.StatusUnauthorized,
        ResponseType.Failure,
        'Please provide a valid header prefix and token'
      )

    const payload = verify(token)

    if (!payload)
      return createResponse(
        res,
        HttpStatus.StatusUnauthorized,
        ResponseType.Failure,
        'Invalid token'
      )

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.user = payload

    next()
  } catch (err) {
    if (err.message === 'jwt expired')
      return createResponse(
        res,
        HttpStatus.StatusUnauthorized,
        ResponseType.Failure,
        `${err.message}`
      )

    return createResponse(
      res,
      HttpStatus.StatusInternalServerError,
      ResponseType.Failure,
      `Error: ${err.message}`
    )
  }
}
