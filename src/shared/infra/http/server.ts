import 'reflect-metadata'
import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import { errors } from 'celebrate'
import cors from 'cors'
import 'express-async-errors'

import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import rateLimiter from './middleware/rateLimiter'
import routes from './routes'

import '@shared/infra/typeorm'
import '@shared/container'

const { PORT, APP_URL, NODE_ENV } = process.env

const app = express()

app.use(rateLimiter)
app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(routes)

app.use(errors())

app.use(
  (
    err: Error & { query?: string },
    request: Request,
    response: Response,
    _: NextFunction,
  ) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: 'error', message: err.message })
    }

    console.error(err)

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' })
  },
)

app.listen(PORT, () => {
  console.log(
    `🚀 Server started in ${NODE_ENV?.toUpperCase()} mode on port ${PORT}`,
  )
  console.log(`🟢 Online on ${APP_URL}`)
})
