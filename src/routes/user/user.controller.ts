import { Request, Response } from 'express'
import { createUser, findUser } from './user.service'
import { createResponse } from '../../common'
import { HttpStatus, ResponseType } from '../../config'
import { sign } from '../../utils'

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { firstName, lastName, email, password } = req.body

  try {
    const newUser = await createUser(firstName, lastName, email, password)

    return createResponse(
      res,
      HttpStatus.StatusCreated,
      ResponseType.Success,
      newUser
    )
  } catch (err) {
    return createResponse(
      res,
      HttpStatus.StatusInternalServerError,
      ResponseType.Failure,
      err.message
    )
  }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body

  try {
    const user = await findUser(email)

    if (!user) {
      return createResponse(
        res,
        HttpStatus.StatusUnauthorized,
        ResponseType.Failure,
        'Invalid login credentials provided.'
      )
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const isMatch: boolean = await user.comparePassword(password)

    if (!isMatch) {
      return createResponse(
        res,
        HttpStatus.StatusUnauthorized,
        ResponseType.Failure,
        'Invalid login credentials provided.'
      )
    }

    const token = sign(user)

    return createResponse(res, HttpStatus.StatusOk, ResponseType.Success, {
      token,
    })
  } catch (err) {
    return createResponse(
      res,
      HttpStatus.StatusInternalServerError,
      ResponseType.Failure,
      err.message
    )
  }
}
