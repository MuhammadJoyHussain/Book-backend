import express from 'express'
import validateRequest from '../../../middleware/validateRequest'
import { ReviewValidation } from './review.validation'
import { ReviewController } from './review.controller'

const router = express.Router()

router.get('/', ReviewController.getReview)

router.post(
  '/create-review',
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview
)

// router
//   .route('/:id')
//   .get(BookController.getBook)
//   .patch(BookController.updateBook)
//   .delete(BookController.deleteBook)

export const ReviewRoutes = router
