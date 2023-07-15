import express from 'express'
import validateRequest from '../../../middleware/validateRequest'
import { BookValidation } from './book.validation'
import { BookController } from './book.controller'
import auth from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.get('/', BookController.getBooks)

router.post(
  '/create-book',
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
)

router
  .route('/:id')
  .get(BookController.getBook)
  .patch(auth(ENUM_USER_ROLE.USER), BookController.updateBook)

export const BookRoutes = router
