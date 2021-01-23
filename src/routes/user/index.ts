import { Router } from 'express'
import { register, login } from './user.controller'
import AuthMiddleware from './user.validation'

const userRoute = Router()

userRoute.post(
  '/register',
  AuthMiddleware.registerValidationRules(),
  AuthMiddleware.validate,
  register
)
userRoute.post(
  '/login',
  AuthMiddleware.loginValidationRules(),
  AuthMiddleware.validate,
  login
)

export default userRoute
