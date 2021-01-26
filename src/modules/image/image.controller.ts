import {
  getImage,
  getUserImages,
  saveImage,
  deleteAllUserImages,
  deleteImages,
} from './image.service'
import { Request, Response } from 'express'
import { createResponse } from '../../common'
import { HttpStatus, ResponseType } from '../../config'
import {
  ICreateImage,
  IGetUserImages,
  ImagePermission,
  ImageStatus,
  fileServerUrl,
} from './image'

/**
 * Creates an image/images
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<Response>}
 */
export const createImage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user: { id: userId },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      files: { images },
    } = req

    if (!images)
      // if images are not provided
      return createResponse(
        res,
        HttpStatus.StatusUnprocessableEntity,
        ResponseType.Failure,
        'Please provide a file to upload'
      )

    const { permission } = req.body

    const hostUlr = `${req.protocol}://${req.get('host')}`

    const userImagesObject: ICreateImage[] = images.map(
      (image: { filename: string }) => {
        // form a create image object for each image added for upload
        return {
          owner: userId,
          imageUrl: `${hostUlr}${fileServerUrl}${image.filename}`,
          permission,
        }
      }
    )

    const newImages = await saveImage(userImagesObject)

    return createResponse(
      res,
      HttpStatus.StatusCreated,
      ResponseType.Success,
      newImages
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatus.StatusInternalServerError,
      ResponseType.Failure,
      `Error creating image: ${err.message}`
    )
  }
}

/**
 * Gets a single image
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<Response>}
 */
export const getOneImage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params
    const {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user: { id: userId },
    } = req

    const image = await getImage(id)

    if (!image)
      return createResponse(
        res,
        HttpStatus.StatusBadRequest,
        ResponseType.Failure,
        'No image matches that ID'
      )

    if (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      image.owner.id !== userId &&
      image.permission === ImagePermission.Private
    )
      return createResponse(
        res,
        HttpStatus.StatusUnauthorized,
        ResponseType.Failure,
        "You're not allowed to view this private image"
      )

    return createResponse(res, HttpStatus.StatusOk, ResponseType.Success, image)
  } catch (err) {
    return createResponse(
      res,
      HttpStatus.StatusInternalServerError,
      ResponseType.Failure,
      `Error getting user image: ${err.message}`
    )
  }
}

/**
 * Gets images marked as deleted for a user
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<Response>}
 */
export const getUserTrash = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user: { id: userId },
    } = req

    const images = await getUserImages({
      owner: userId,
      status: ImageStatus.Deleted,
    })

    return createResponse(
      res,
      HttpStatus.StatusOk,
      ResponseType.Success,
      images
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatus.StatusInternalServerError,
      ResponseType.Failure,
      `Error getting user trash: ${err.message}`
    )
  }
}

/**
 * Gets all active user images
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<Response>}
 */
export const findUserImages = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params
    const {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user: { id: userId },
    } = req

    let clause: IGetUserImages

    // if it's the images owner
    if (id === userId) {
      clause = {
        owner: id,
        status: ImageStatus.Active,
      }
    } else {
      clause = {
        owner: id,
        permission: ImagePermission.Public,
        status: ImageStatus.Active,
      }
    }

    const images = await getUserImages(clause)

    return createResponse(
      res,
      HttpStatus.StatusOk,
      ResponseType.Success,
      images
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatus.StatusInternalServerError,
      ResponseType.Failure,
      `Error getting user images: ${err.message}`
    )
  }
}

/**
 * Deletes all user images
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<Response>}
 */
export const clearAllUserImages = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user: { id: userId },
    } = req

    const result = await deleteAllUserImages(userId)

    return createResponse(
      res,
      HttpStatus.StatusOk,
      ResponseType.Success,
      result
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatus.StatusInternalServerError,
      ResponseType.Failure,
      `Error clearing all user images: ${err.message}`
    )
  }
}

/**
 * Bulk deletes images
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<Response>}
 */
export const clearImages = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      user: { id: userId },
    } = req
    const { imageIds } = req.body

    const result = await deleteImages(imageIds, userId)

    return createResponse(
      res,
      HttpStatus.StatusOk,
      ResponseType.Success,
      result
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatus.StatusInternalServerError,
      ResponseType.Failure,
      `Error clearing images: ${err.message}`
    )
  }
}
