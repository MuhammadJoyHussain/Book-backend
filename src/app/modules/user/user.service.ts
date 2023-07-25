import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { IUser } from './user.interface'
import User from './user.model'
import { ILoginResponse } from '../../../interfaces/common'

const createUser = async (payload: IUser): Promise<ILoginResponse> => {
  const createUser = await User.create(payload)

  const { email } = payload

  if (!createUser) {
    throw new ApiError(400, 'Failed to create!')
  }
  const isUserExist = await User.isUserExist(email)

  const { email: userEmail, _id } = isUserExist

  const accessToken = jwtHelpers.createToken(
    { userEmail, _id },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string
  )

  return { accessToken }
}

export const UserService = {
  createUser,
}
