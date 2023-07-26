/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
import { SortOrder } from 'mongoose'
import { IReview } from './review.interface'
import Review from './review.model'
import ApiError from '../../../errors/ApiError'
import { JwtPayload, decode } from 'jsonwebtoken'

const createReview = async (
  payload: IReview,
  accessToken: any,
  id: any
): Promise<IReview> => {
  const decodeToken = decode(accessToken) as JwtPayload

  const { _id } = decodeToken

  payload.user = _id
  // payload.book = id
  console.log(_id, id)

  const review = await Review.create(payload)

  return review
}

const getReview = async (): Promise<IReview[]> => {
  const result = await Review.find().populate('user')

  return result
}

// const getAllBooks = async (): Promise<IBook[]> => {
//   const result = await Book.find({})

//   return result
// }

// const getBook = async (id: string): Promise<IBook | null> => {
//   const book = await Book.findById(id)

//   if (!book) {
//     throw new ApiError(404, `No Book Found with the id of ${id}`)
//   }

//   return book
// }

// const updateBook = async (
//   id: string,
//   accessToken: any,
//   payload: Partial<IBook>
// ): Promise<IBook | null> => {
//   const decodeToken = decode(accessToken) as JwtPayload

//   const { _id } = decodeToken

//   const book = await Book.findOneAndUpdate({ _id: id }, payload, { new: true })

//   if (book?.user.toString() !== _id) {
//     throw new ApiError(400, 'User did not match')
//   }

//   if (!book) {
//     throw new ApiError(404, `No Book Found with the id of ${id}`)
//   }

//   return book
// }

// const deleteBook = async (id: string, accessToken: any) => {
//   const decodeToken = decode(accessToken) as JwtPayload

//   const { _id } = decodeToken

//   const book = await Book.findOneAndDelete({ _id: id })

//   if (!book) {
//     throw new ApiError(404, `No Book Found with the id of ${id}`)
//   }

//   if (book?.user.toString() !== _id) {
//     throw new ApiError(400, 'User did not match')
//   }

//   return book
// }

export const ReviewService = {
  createReview,
  getReview,
  // getBooks,
  // getBook,
  // updateBook,
  // deleteBook,
}
