export interface HttpStatusI {
  [propName: string]: number
}

export type ResponseType = boolean

export const HttpStatus: HttpStatusI = {
  StatusOk: 200,
  StatusBadRequest: 400,
  StatusUnauthorized: 401,
  StatusInternalServerError: 500,
}
