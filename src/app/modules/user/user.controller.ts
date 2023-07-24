import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { UserService } from './user.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IUser } from './user.interface'
import config from '../../../config'

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { ...signupData } = req.body

  const result = await UserService.createUser(signupData)

  const { refreshToken, ...others } = result

  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: others,
  })
})

export const UserController = {
  createUser,
}
