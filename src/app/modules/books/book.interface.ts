import { Model, ObjectId } from 'mongoose'

export type IBook = {
  title: string
  publisher: {
    name: string
    location: string
  }
  genre: string
  publicationYear: string
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
