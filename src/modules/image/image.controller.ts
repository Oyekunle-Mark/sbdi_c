// import { getImage, getUserImages } from './image.service'
// import { Request, Response } from 'express'
// import { createResponse } from '../../common'
// import { HttpStatus, ResponseType } from '../../config'
//
// export const getOneImage = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const { firstName, lastName, email, password } = req.body
//
//   try {
//     const newUser = await createUser(firstName, lastName, email, password)
//
//     return createResponse(
//       res,
//       HttpStatus.StatusCreated,
//       ResponseType.Success,
//       newUser
//     )
//   } catch (err) {
//     return createResponse(
//       res,
//       HttpStatus.StatusInternalServerError,
//       ResponseType.Failure,
//       err.message
//     )
//   }
// }
