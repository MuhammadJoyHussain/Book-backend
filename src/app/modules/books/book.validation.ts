import { z } from 'zod'

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Titled is required',
    }),
    publisher: z.object({
      name: z.string({
        required_error: 'Author name is required',
      }),
      location: z.string({
        required_error: 'Author location is required',
      }),
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publicationYear: z.string({
      required_error: 'Publication date is required',
    }),
    reviews: z.string().optional(),
  }),
})

export const BookValidation = {
  createBookZodSchema,
}
