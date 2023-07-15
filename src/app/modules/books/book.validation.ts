import { z } from 'zod'

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Titled is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publicationDate: z.string({
      required_error: 'Publication date is required',
    }),
    reviews: z.string({
      required_error: 'Reviews is required',
    }),
  }),
})

export const BookValidation = {
  createBookZodSchema,
}
