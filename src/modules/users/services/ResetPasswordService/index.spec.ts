import AppError from '@shared/errors/AppError'
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository'
import ResetPasswordService from '.'

let fakeUsersRepository: FakeUsersRepository
let resetPasswordService: ResetPasswordService
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeHashProvider: FakeHashProvider

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeHashProvider = new FakeHashProvider()

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    )
  })

  it('should be able to recover the password using the email', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    await resetPasswordService.execute({
      token,
      password: '123123',
    })

    const userUpdated = await fakeUsersRepository.findById(user.id)

    expect(userUpdated?.password).toBe('123123')
    expect(generateHash).toBeCalledWith(user.password)
  })

  it('should throws an error if token does not exists', async () => {
    const resetPasswordPromise = resetPasswordService.execute({
      token: 'non-existing-token',
      password: '123123',
    })

    await expect(resetPasswordPromise).rejects.toBeInstanceOf(AppError)
  })

  it('should throws an error if user does not exists', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    )

    const resetPasswordPromise = resetPasswordService.execute({
      token,
      password: '123123',
    })

    await expect(resetPasswordPromise).rejects.toBeInstanceOf(AppError)
  })

  it('should throws an error if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()

      return customDate.setHours(customDate.getHours() + 3)
    })

    const resetPasswordPromise = resetPasswordService.execute({
      token,
      password: '123123',
    })

    await expect(resetPasswordPromise).rejects.toBeInstanceOf(AppError)
  })
})

/**
 * - Hash
 * - 2h expiração
 * - user inexistente
 */
