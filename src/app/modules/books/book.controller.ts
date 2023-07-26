import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { BookService } from './book.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IBook } from './book.interface'
import { bookFilterableFields } from './book.constant'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'

const createBook = asyncHandler(async (req: Request, res: Response) => {
  const book = req.body
  const accessToken = req.headers.authorization

  const result = await BookService.createBook(book, accessToken)

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully!',
    data: result,
  })
})

const getBooks = asyncHandler(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await BookService.getBooks(filters, paginationOptions)

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrived successfully!',
    meta: result.meta,
    data: result.data,
  })
})

const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
  const result = await BookService.getAllBooks()

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrived successfully!',
    data: result,
  })
})

const getBook = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await BookService.getBook(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrived successfully!',
    data: result,
  })
})

const updateBook = asyncHandler(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization
  const id = req.params.id
  const update = req.body

  const result = await BookService.updateBook(id, accessToken, update)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrived successfully!',
    data: result,
  })
})

const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization
  const id = req.params.id

  await BookService.deleteBook(id, accessToken)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully!',
    data: {},
  })
})

export const BookController = {
  createBook,
  getBooks,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
}
