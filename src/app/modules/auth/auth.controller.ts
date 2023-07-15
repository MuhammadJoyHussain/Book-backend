import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { AuthService } from './auth.service'
import config from '../../../config'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await AuthService.loginUser(loginData)
  const { refreshToken, ...others } = result

  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User loggedin Successfully',
    data: others,
  })
})

export const AuthController = { loginUser }
