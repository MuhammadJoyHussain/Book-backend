import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import User from './user.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const createUser = await User.create(user)

  if (!createUser) {
    throw new ApiError(400, 'Failed to create!')
  }

  return createUser
}

export const UserService = {
  createUser,
}
