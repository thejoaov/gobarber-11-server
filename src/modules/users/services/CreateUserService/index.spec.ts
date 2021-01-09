import AppError from '@shared/errors/AppError'
import 'reflect-metadata'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository'
import CreateUserService from '.'

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    )

    const user = await createUserService.execute({
      email: 'teste@teste.com',
      name: 'teste',
      password: 'teste',
    })

    expect(user).toBeTruthy()
    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('name')
  })

  it('should not be able to create a new user with the same email', async () => {
    const fakeUserRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    )

    const user = await createUserService.execute({
      email: 'teste@teste.com',
      name: 'teste',
      password: 'teste',
    })

    expect(user).toBeTruthy()
    expect(
      createUserService.execute({
        email: 'teste@teste.com',
        name: 'teste',
        password: 'teste',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
