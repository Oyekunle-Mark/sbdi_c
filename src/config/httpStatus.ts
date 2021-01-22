export interface HttpStatusI {
  [propName: string]: number
}

export interface ResponseTypeI {
  [propName: string]: boolean
}

export const HttpStatus: HttpStatusI = {
  StatusOk: 200,
  StatusBadRequest: 400,
  StatusUnauthorized: 401,
  StatusNotFound: 404,
  StatusInternalServerError: 500,
}

export const ResponseType: ResponseTypeI = {
  Success: true,
  Failure: false,
}
