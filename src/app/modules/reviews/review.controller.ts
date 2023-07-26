import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ReviewService } from './review.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IReview } from './review.interface'

const createReview = asyncHandler(async (req: Request, res: Response) => {
  const review = req.body
  const id = req.params.id
  const accessToken = req.headers.authorization

  console.log(accessToken)

  const result = await ReviewService.createReview(review, accessToken, id)

  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review added successfully!',
    data: result,
  })
})

const getReview = asyncHandler(async (req: Request, res: Response) => {
  const result = await ReviewService.getReview()

  sendResponse<IReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrived successfully!',
    data: result,
  })
})

export const ReviewController = {
  createReview,
  getReview,
}
