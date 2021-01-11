// import AppError from '@shared/errors/AppError'

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository'
import SendForgotPasswordEmailService from '.'

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeMailProvider = new FakeMailProvider()
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')
    const sendFogotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    )

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await sendFogotPasswordEmail.execute({
      email: 'johndoe@example.com',
    })

    expect(sendMail).toBeCalled()
  })
})
