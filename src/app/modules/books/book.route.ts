import express from 'express'
import validateRequest from '../../../middleware/validateRequest'
import { BookValidation } from './book.validation'
import { BookController } from './book.controller'

const router = express.Router()

router.get('/', BookController.getBooks)

router.post(
  '/create-book',
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
)

router.get('/:id', BookController.getBook)

router.patch('/:id', BookController.updateBook)

export const BookRoutes = router
