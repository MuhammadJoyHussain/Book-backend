/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import mongoose from 'mongoose'
import config from './index'

const connectDB = async () => {
  try {
    mongoose.connect(config.mongo_uri as string)

    console.log('Database connected')
  } catch (err) {
    console.log(`Error: ${err}`)
    process.exit(1)
  }
}

export default connectDB
