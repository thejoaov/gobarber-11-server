import { Router } from 'express'
import multer from 'multer'
import { container } from 'tsyringe'

import uploadConfig from 'config/upload'

import CreateUserService from 'modules/users/services/CreateUserService'
import UpdateUserAvatarService from 'modules/users/services/UpdateUserAvatarService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router()

const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const createUser = container.resolve(CreateUserService)

  const user = await createUser.execute({
    name,
    email,
    password,
  })

  const { password: omittedPassword, ...userResponse } = user

  return response.json(userResponse)
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    })

    const { password: omittedPassword, ...userResponse } = user

    return response.json(userResponse)
  },
)

export default usersRouter
