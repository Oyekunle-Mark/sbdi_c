import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import { createResponse } from '../common'
import { HttpStatus, ResponseType } from '../config'

export const validateJoiSchema = (schema: Joi.ObjectSchema<any>) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)

    if (error) {
      return createResponse(
        res,
        HttpStatus.StatusBadRequest,
        ResponseType.Failure,
        error.details.map((x: { message: any }) => x.message).join(', ')
      )
    }

    next()
  }
}
