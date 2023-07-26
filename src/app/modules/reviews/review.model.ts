import { Schema, model } from 'mongoose'
import { ReviewModel, IReview } from './review.interface'

const reviewShema = new Schema<IReview, ReviewModel>(
  {
    review: {
      type: String,
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Book',
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const Review = model<IReview, ReviewModel>('Review', reviewShema)

export default Review
