import { Model, ObjectId } from 'mongoose'

export type IBook = {
  title: string
  author: string
  genre: string
  publicationDate: string
  reviews: string
  user: ObjectId
}

export type BookModel = Model<IBook, Record<string, unknown>>

export type IBookFilters = {
  searchTerm?: string
  title?: string
  author?: string
  genre?: string
}
