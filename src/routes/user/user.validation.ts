import { body, ValidationChain} from 'express-validator'
import { BaseValidator } from '../../common'

export default class AuthMiddleware extends BaseValidator {
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
        .withMessage('password be at least 11 characters'),
    ]
  }

  static loginValidationRules(): ValidationChain[] {
    return [
      body('email').isEmail().withMessage('Invalid email format.'),
      body('password')
        .isLength({ min: 6 })
        .withMessage('password must be at least 11 characters'),
    ]
  }
}
