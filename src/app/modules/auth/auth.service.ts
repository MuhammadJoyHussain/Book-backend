import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { ILogin, ILoginResponse } from '../../../interfaces/common'
import User from '../user/user.model'
import httpStatus from 'http-status'

const loginUser = async (payload: ILogin): Promise<ILoginResponse> => {
  const { email, password } = payload

  const isUserExist = await User.isUserExist(email)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  const { email: userEmail, _id } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { userEmail, _id },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { userEmail },
    config.jwt_refresh_secret as Secret,
    config.jwt_refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
  }
}

export const AuthService = {
  loginUser,
}
