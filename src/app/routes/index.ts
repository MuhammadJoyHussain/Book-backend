import express from 'express'
import { BookRoutes } from '../modules/books/book.route'
import { UserRoutes } from '../modules/user/user.route'
import { AuthRoutes } from '../modules/auth/auth.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/book',
    route: BookRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
