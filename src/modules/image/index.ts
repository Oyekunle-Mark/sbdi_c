import { Router } from 'express'
import { getOneImage, getUserTrash, findUserImages } from './image.controller'
import ImageValidator from './image.validation'
import { verifyToken } from '../../common'

const imageRoute = Router()

imageRoute.get(
  '/:id',
  verifyToken,
  ImageValidator.getOneImageValidationRules(),
  ImageValidator.validate,
  getOneImage
)

imageRoute.get('/trash', verifyToken, getUserTrash)

imageRoute.get(
  '/user/:id',
  verifyToken,
  ImageValidator.getOneImageValidationRules(),
  ImageValidator.validate,
  findUserImages
)

export { imageRoute }
