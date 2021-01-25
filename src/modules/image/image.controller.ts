import { getImage, getUserImages } from './image.service'
import { Request, Response } from 'express'
import { createResponse } from '../../common'
import { HttpStatus, ResponseType } from '../../config'
import { IGetUserImages, ImagePermission, ImageStatus } from './image'

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

    if (image.id !== userId && image.permission === ImagePermission.Private)
      return createResponse(
        res,
        HttpStatus.StatusUnauthorized,
        ResponseType.Failure,
        "You're not allowed to view this private image"
      )

    return createResponse(
      res,
      HttpStatus.StatusCreated,
      ResponseType.Success,
      image
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatus.StatusInternalServerError,
      ResponseType.Failure,
      `Error getting user image: ${err.message}`
    )
  }
}

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
      HttpStatus.StatusCreated,
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
      HttpStatus.StatusCreated,
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
