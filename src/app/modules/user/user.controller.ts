import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { UserService } from './user.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IUser } from './user.interface'

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = req.body
  const result = await UserService.createUser(user)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  })
})

export const UserController = {
  createUser,
}
