import multer from 'multer'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'
import shortid from 'shortid'
import { Request, Response, NextFunction } from 'express'
import { createResponse } from '../../common'
import { HttpStatus, ResponseType } from '../../config'
import { fileServerUrl } from './image'

shortid.characters(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@'
)

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../../../src/uploads'))
  },
  filename(req, file, cb) {
    const {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user: { id: userId },
    } = req

    const userIdHash = crypto.createHash('md5').update(userId).digest('hex')
    const timeStamp = Date.now()
    const imageId = shortid.generate()
    const fileExtension = path.extname(file.originalname)

    const fileName = `${userIdHash}_${timeStamp}_${imageId}${fileExtension}`

    cb(null, fileName)
  },
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const fileFilter = (req, file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  }

  return cb(new Error('Only jpeg, jpg, and png files are allowed!'), false)
}

const multerConfig = multer({
  storage,
  limits: {
    fileSize: 100000000, // 100MB TODO: ensure file fits
  },
  fileFilter,
}).fields([{ name: 'images', maxCount: 20 }]) // TODO: ensure file count is enough

/**
 * The multer middleware to handle file upload, validation and formatting
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const imageSanitizer = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  multerConfig(req, res, (err: string | object) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!req.files)
      return createResponse(
        res,
        HttpStatus.StatusUnprocessableEntity,
        ResponseType.Failure,
        'Please provide images'
      )

    if (err instanceof multer.MulterError)
      return createResponse(
        res,
        HttpStatus.StatusUnprocessableEntity,
        ResponseType.Failure,
        err
      )

    if (err)
      return createResponse(
        res,
        HttpStatus.StatusUnprocessableEntity,
        ResponseType.Failure,
        err
      )

    next()
  })
}

/**
 * Deletes an invoice file from the invoiceUploads directory
 * @param fileUrl the image full url
 * @return {boolean}
 */
export const deleteImageFile = (fileUrl: string) => {
  const result = fileUrl.split(fileServerUrl)
  const filePath = path.join(__dirname, '../../../src/uploads/', result[1])

  fs.unlink(filePath, (err) => {
    return !err
  })
}
