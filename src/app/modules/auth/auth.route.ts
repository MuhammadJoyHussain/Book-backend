import express from 'express'
import validateRequest from '../../../middleware/validateRequest'
import { AuthController } from './auth.controller'
import { AuthValidation } from './auth.validation'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
)

router.post('/logout', AuthController.logout)

export const AuthRoutes = router
