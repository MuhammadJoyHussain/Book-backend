import { z } from 'zod'

const createReviewZodSchema = z.object({
  body: z.object({
    review: z.string({
      required_error: 'Review required',
    }),
  }),
})

export const ReviewValidation = {
  createReviewZodSchema,
}
