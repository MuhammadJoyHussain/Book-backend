import { Schema, model } from 'mongoose'
import { BookModel, IBook } from './book.interface'

const bookSchema = new Schema<IBook, BookModel>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  publisher: {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  genre: {
    type: String,
    required: true,
  },
  publicationYear: {
    type: String,
    required: true,
  },
  reviews: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
})

const Book = model<IBook, BookModel>('Book', bookSchema)

export default Book
