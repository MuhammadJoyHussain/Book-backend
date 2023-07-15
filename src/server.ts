/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import connectDB from './config/db'
import { globalErrorHandler, notFound } from './middleware/globalErrorHandler'
import routes from './app/routes'
import cookieParser from 'cookie-parser'

const app = express()

const port = 5000

connectDB()

app.use(cors())
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', routes)

app.use(globalErrorHandler)
app.use(notFound)

app.listen(port, () => console.log(`Server stared on port ${port}`))
