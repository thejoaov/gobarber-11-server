import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import { errors } from 'celebrate'
import fancyLogger from '@poppinss/fancy-logs'
import cors from 'cors'
import dotenv from 'dotenv'
import 'express-async-errors'

import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import routes from './routes'

import '@shared/infra/typeorm'
import '@shared/container'

dotenv.config({ path: '../../../../' })

const { PORT, APP_URL, NODE_ENV } = process.env

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(routes)

app.use(errors())

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message })
  }

  fancyLogger.error(err)

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' })
})

app.listen(PORT, () => {
  fancyLogger.info(
    `🚀 Server started in ${NODE_ENV?.toUpperCase()} mode on port ${PORT}`,
  )
  fancyLogger.success(`🟢 Online on ${APP_URL}`)
})
