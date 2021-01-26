import { body, param, ValidationChain } from 'express-validator'
import { BaseValidator } from '../../common'
import { ImagePermission } from './image'

export default class ImageValidator extends BaseValidator {
  static createImageValidationRules(): ValidationChain[] {
    return [
      body('permission')
        .isIn(Object.values(ImagePermission))
        .withMessage(
          `Invalid value for image permission. Can only be one of ${Object.values(
            ImagePermission
          )}`
        )
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
      body('imageIds')
        .isArray({ min: 1 })
        .withMessage('imageIds must be an array'),
      body('imageIds.*')
        .isMongoId()
        .withMessage('imageIds must contain valid image ids'),
    ]
  }
}
