import { Router } from 'express'
import {
  getOneImage,
  getUserTrash,
  findUserImages,
  createImage,
  clearImages,
  clearAllUserImages,
} from './image.controller'
import ImageValidator from './image.validation'
import { imageSanitizer } from './fileUploadUtil'
import { verifyToken } from '../../common'

const imageRoute = Router()

imageRoute.post(
  '/',
  verifyToken,
  imageSanitizer,
  ImageValidator.createImageValidationRules(),
  ImageValidator.validate,
  createImage
)

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

imageRoute.delete('/user/clear', verifyToken, clearAllUserImages)

imageRoute.put(
  '/delete',
  verifyToken,
  ImageValidator.clearImagesValidationRules(),
  ImageValidator.validate,
  clearImages
)

export { imageRoute }
