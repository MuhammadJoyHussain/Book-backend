import express from 'express'
import validateRequest from '../../../middleware/validateRequest'
import { UserValidation } from './user.validation'
import { UserController } from './user.controller'

const router = express.Router()

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
)

export const UserRoutes = router
