import { body, param, ValidationChain } from 'express-validator'
import { BaseValidator } from '../../common'
import { ImagePermission } from './image'

export default class ImageValidator extends BaseValidator {
  static createImageValidationRules(): ValidationChain[] {
    return [
      body('permission')
        .isIn(Object.values(ImagePermission))
        .withMessage('Invalid value for image permission')
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

  static clearImagesValidationRules(): ValidationChain[] {
    return [
      body('imageIds.*').isMongoId().withMessage('Invalid value for imageIds'),
    ]
  }
}
