import { Router } from 'express'
import { register, login } from './user.controller'
import UserValidator from './user.validation'

const userRoute = Router()

userRoute.post(
  '/register',
  UserValidator.registerValidationRules(),
  UserValidator.validate,
  register
)

userRoute.post(
  '/login',
  UserValidator.loginValidationRules(),
  UserValidator.validate,
  login
)

export { userRoute }
