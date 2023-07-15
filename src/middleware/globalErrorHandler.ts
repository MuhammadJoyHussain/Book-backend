/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { Error } from 'mongoose'
import config from '../config'
import ApiError from '../errors/ApiError'
import handleValidationError from '../errors/handleValidationError'
import { ZodError } from 'zod'
import handleZodError from '../errors/handleZodError'
import { IGenericErrorMessage } from '../interfaces/error'
import httpStatus from 'http-status'

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response
) => {
  config.node_env === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, error)
    : console.log(`🐱‍🏍 globalErrorHandler ~~`, error)

  let statusCode = 500
  let message = 'Something went wrong !'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.node_env !== 'production' ? error?.stack : undefined,
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: {
      path: req.originalUrl,
      message: 'API Not Found',
    },
  })
  const error = new Error(`Not Found - ${req.originalUrl}`)
  next(error)
}

export { globalErrorHandler, notFound }
