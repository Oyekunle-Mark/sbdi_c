import { body, ValidationChain} from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { BaseValidator } from '../../common'
import { findUser } from './user.service'
import { createResponse } from '../../common'
import { HttpStatus, ResponseType } from '../../config'

export default class UserValidator extends BaseValidator {
  static registerValidationRules(): ValidationChain[] {
    return [
      body('firstName')
        .isLength({ min: 2 })
        .withMessage('firstName must be minimum of two characters'),
      body('lastName')
        .isLength({ min: 2 })
        .withMessage('lastName must be minimum of two characters'),
      body('email').isEmail().withMessage('Invalid email format.'),
      body('password')
        .isLength({ min: 6 })
        .withMessage('password be at least 6 characters'),
    ]
  }

  static loginValidationRules(): ValidationChain[] {
    return [
      body('email').isEmail().withMessage('Invalid email format.'),
      body('password')
        .isLength({ min: 6 })
        .withMessage('password must be at least 6 characters'),
    ]
  }

  static async checkExistingEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { email } = req.body
      const user = await findUser(email)

      if (user) {
        return createResponse(
          res,
          HttpStatus.StatusUnprocessableEntity,
          ResponseType.Failure,
          'Email already exist.'
        )
      }

      next()
    } catch (e) {
      return createResponse(
        res,
        HttpStatus.StatusInternalServerError,
        ResponseType.Failure,
        `Error checking existing email: ${e.message}`
      )
    }
  }
}
