export interface IHttpStatus {
  [propName: string]: number
}

export interface IResponseType {
  [propName: string]: boolean
}

export const HttpStatus: IHttpStatus = {
  StatusOk: 200,
  StatusCreated: 201,
  StatusBadRequest: 400,
  StatusUnauthorized: 401,
  StatusNotFound: 404,
  StatusInternalServerError: 500,
}

export const ResponseType: IResponseType = {
  Success: true,
  Failure: false,
}
