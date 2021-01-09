import AppError from '@shared/errors/AppError'
import 'reflect-metadata'

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository'
import UpdateAvatarUserService from '.'

describe('UpdateAvatarUserService', () => {
  it('should be able to update user avatar', async () => {
    const fakeUserRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()
    const updateAvatarUserService = new UpdateAvatarUserService(
      fakeUserRepository,
      fakeStorageProvider,
    )

    const user = await fakeUserRepository.create({
      name: 'DETONATOR',
      email: 'detonator@massacration.com',
      password: 'massacration123',
    })

    const updatedUser = await updateAvatarUserService.execute({
      avatarFilename: 'detonator.jpg',
      user_id: user.id,
    })

    expect(updatedUser.avatar).toBe('detonator.jpg')
  })

  it('should be able to update user avatar and delete the old', async () => {
    const fakeUserRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')
    const updateAvatarUserService = new UpdateAvatarUserService(
      fakeUserRepository,
      fakeStorageProvider,
    )

    const user = await fakeUserRepository.create({
      name: 'DETONATOR',
      email: 'detonator@massacration.com',
      password: 'massacration123',
    })
    await updateAvatarUserService.execute({
      avatarFilename: 'detonator.jpg',
      user_id: user.id,
    })
    const updatedUser = await updateAvatarUserService.execute({
      avatarFilename: 'detonator_massacration.jpg',
      user_id: user.id,
    })

    expect(deleteFile).toBeCalledWith('detonator.jpg')
    expect(updatedUser.avatar).toBe('detonator_massacration.jpg')
  })

  it('should not be able to update user avatar with non existing user_id', async () => {
    const fakeUserRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()
    const updateAvatarUserService = new UpdateAvatarUserService(
      fakeUserRepository,
      fakeStorageProvider,
    )

    expect(
      updateAvatarUserService.execute({
        avatarFilename: 'detonator.jpg',
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
