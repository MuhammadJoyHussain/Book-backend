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

  const accessToken = jwtHelpers.createToken(
    { email },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string
  )

  return { accessToken }
}

export const UserService = {
  createUser,
}
