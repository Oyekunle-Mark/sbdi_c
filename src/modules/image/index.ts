import { Router } from 'express'
import { getOneImage, getUserTrash, findUserImages } from './image.controller'
import ImageValidator from './image.validation'

const imageRoute = Router()

imageRoute.get(
  '/:id',
  ImageValidator.getOneImageValidationRules(),
  ImageValidator.validate,
  getOneImage
)

imageRoute.get('/trash', getUserTrash)

imageRoute.get(
  '/user/:id',
  ImageValidator.getOneImageValidationRules(),
  ImageValidator.validate,
  findUserImages
)

export { imageRoute }
