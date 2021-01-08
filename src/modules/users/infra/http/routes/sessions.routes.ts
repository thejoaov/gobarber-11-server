import { Router } from 'express'
import AuthenticateUserService from 'modules/users/services/AuthenticateUserService'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const usersRepository = new UsersRepository()
  const authenticateUser = new AuthenticateUserService(usersRepository)

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  })

  const { password: omittedPassword, ...responseUser } = user

  return response.json({ user: responseUser, token })
})

export default sessionsRouter
