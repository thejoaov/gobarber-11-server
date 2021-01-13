// import AppError from '@shared/errors/AppError'
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository'
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository'
import ResetPasswordService from '.'

let fakeUsersRepository: FakeUsersRepository
let resetPasswordService: ResetPasswordService
let fakeUserTokensRepository: FakeUserTokensRepository

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    )
  })

  it('should be able to recover the password using the email', async () => {
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
  })
})
