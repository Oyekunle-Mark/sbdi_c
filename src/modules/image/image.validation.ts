import { body, param, ValidationChain } from 'express-validator'
import { BaseValidator } from '../../common'
import { ImagePermission, ImageStatus } from './image'

export default class ImageValidator extends BaseValidator {
  static createImageValidationRules(): ValidationChain[] {
    return [
      body('owner').isMongoId().withMessage('Invalid owner id provided.'),
      body('permission')
        .isIn(Object.values(ImagePermission))
        .withMessage('Invalid value for image permission')
        .optional({ nullable: true, checkFalsy: true }),
      body('status')
        .isIn(Object.values(ImageStatus))
        .withMessage('Invalid value for image status')
        .optional({ nullable: true, checkFalsy: true }),
    ]
  }

  static getOneImageValidationRules(): ValidationChain[] {
    return [
      param('id')
        .isMongoId()
        .withMessage('Invalid value provided for image id'),
    ]
  }
}
