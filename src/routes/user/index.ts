import { Router } from 'express'
import { register, login } from './user.controller'
import { registerJoiSchema, loginJoiSchema } from './user.validation'
import { validateJoiSchema } from '../../utils'

const userRoute = Router()

userRoute.post('/register', validateJoiSchema(registerJoiSchema), register)
userRoute.post('/login', validateJoiSchema(loginJoiSchema), login)

export default userRoute
