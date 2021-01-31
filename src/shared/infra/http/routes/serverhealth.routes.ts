import { Router } from 'express'
import ServerHealthController from '../controllers/ServerHealthController'

const serverHealthRouter = Router()
const serverHealthController = new ServerHealthController()

serverHealthRouter.get('/', serverHealthController.show)

export default serverHealthRouter
