import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository'
import AuthenticateUserService from '.'
import CreateUserService from '../CreateUserService'

describe('AuthenticateUserService', () => {
  it('should be able to authenticate', async () => {
    const user = {
      email: 'teste@teste.com',
      name: 'teste',
      password: 'teste',
    }
    const fakeHashProvider = new FakeHashProvider()
    const fakeUserRepository = new FakeUsersRepository()
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    )
    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    )

    const createdUser = await createUser.execute(user)
    const authenticatedUser = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    })

    expect(createdUser).toEqual(authenticatedUser.user)
    expect(authenticatedUser).toHaveProperty('token')
  })

  it('should not be able to authenticate with different email', async () => {
    const user = {
      email: 'teste@teste.com',
      name: 'teste',
      password: 'teste',
    }
    const fakeHashProvider = new FakeHashProvider()
    const fakeUserRepository = new FakeUsersRepository()
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    )
    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    )

    const createdUser = await createUser.execute(user)

    expect(createdUser).toBeTruthy()
    expect(
      authenticateUser.execute({
        email: 'different@email.com',
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with different password', async () => {
    const user = {
      email: 'teste@teste.com',
      name: 'teste',
      password: 'teste',
    }
    const fakeHashProvider = new FakeHashProvider()
    const fakeUserRepository = new FakeUsersRepository()
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    )
    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    )

    const createdUser = await createUser.execute(user)

    expect(createdUser).toBeTruthy()
    expect(
      authenticateUser.execute({
        email: user.email,
        password: 'differentPassword',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
