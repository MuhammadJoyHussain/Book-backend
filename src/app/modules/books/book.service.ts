/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { bookSearchableFields } from './book.constant'
import { IBook, IBookFilters } from './book.interface'
import Book from './book.model'
import ApiError from '../../../errors/ApiError'
import { JwtPayload, decode } from 'jsonwebtoken'

const createBook = async (payload: IBook, accessToken: any): Promise<IBook> => {
  const decodeToken = decode(accessToken) as JwtPayload

  const { _id } = decodeToken
  payload.user = _id

  const book = await Book.create(payload)

  return book
}

const getBooks = async (
  filters: IBookFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Book.find(whereConditions)
    .populate('user')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Book.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getAllBooks = async (): Promise<IBook[]> => {
  const result = await Book.find({})

  return result
}

const getBook = async (id: string): Promise<IBook | null> => {
  const book = await Book.findById(id)

  if (!book) {
    throw new ApiError(404, `No Book Found with the id of ${id}`)
  }

  return book
}

const updateBook = async (
  id: string,
  accessToken: any,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const decodeToken = decode(accessToken) as JwtPayload

  const { _id } = decodeToken

  if (!payload.user === _id) {
    throw new ApiError(400, 'User did not match')
  }

  const book = await Book.findOneAndUpdate({ _id: id }, payload, { new: true })

  if (!book) {
    throw new ApiError(404, `No Book Found with the id of ${id}`)
  }

  return book
}

export const BookService = {
  createBook,
  getAllBooks,
  getBooks,
  getBook,
  updateBook,
}
