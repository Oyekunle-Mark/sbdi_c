interface IHttpStatus {
  StatusOk: number
  StatusCreated: number
  StatusBadRequest: number
  StatusUnauthorized: number
  StatusNotFound: number
  StatusUnprocessableEntity: number
  StatusInternalServerError: number
}

export const HttpStatus: IHttpStatus = {
  StatusOk: 200,
  StatusCreated: 201,
  StatusBadRequest: 400,
  StatusUnauthorized: 401,
  StatusNotFound: 404,
  StatusUnprocessableEntity: 422,
  StatusInternalServerError: 500,
}

interface IResponseType {
  Success: boolean
  Failure: boolean
}

export const ResponseType: IResponseType = {
  Success: true,
  Failure: false,
}
