import { Model, ObjectId } from 'mongoose'

export type IReview = {
  review: string
  book: ObjectId
  user: ObjectId
}

export type ReviewModel = Model<IReview, Record<string, unknown>>
