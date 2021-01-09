import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import IUsersRepository from '../../repositories/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    // user.password -> Senha criptografada
    // password -> Senha não criptografada

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    )
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const { expiresIn, secret } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    // Se passou até aqui, o usuário foi autenticado
    return {
      user,
      token,
    }
  }
}
