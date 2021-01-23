import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { createResponse } from './'
import { HttpStatus, ResponseType } from '../config'

export class BaseValidator {
  static validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    const errors = validationResult(req)

    if (errors.isEmpty()) return next()

    const extractedErrors: string[] = []

    errors.array().forEach((err) => extractedErrors.push(err.msg))

    return createResponse(
      res,
      HttpStatus.StatusUnprocessableEntity,
      ResponseType.Failure,
      extractedErrors
    )
  }
}
