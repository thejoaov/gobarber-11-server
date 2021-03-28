import 'reflect-metadata'
import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import { errors } from 'celebrate'
import cors from 'cors'
import 'express-async-errors'

import uploadConfig from '@config/upload'
import SentryError from '@shared/errors/Sentry'
import AppError from '@shared/errors/AppError'
import rateLimiter from './middleware/rateLimiter'
import routes from './routes'

import '@shared/infra/typeorm'
import '@shared/container'
import { errorLogger, requestLogger } from './middleware/logger'

const { PORT, API_URL, NODE_ENV } = process.env

const app = express()
const sentry = new SentryError()

sentry.init()
dotenv.config({ debug: true })

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(rateLimiter)
app.use(routes)

app.use(errors())

app.use(requestLogger)

app.use(
  (
    err: Error & { query?: string },
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: 'error', message: err.message })
    }

    sentry.captureError(err)
    errorLogger(err, request, response, next)
    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' })
  },
)

app.listen(PORT, () => {
  console.log(
    `🚀 Server started in ${NODE_ENV?.toUpperCase()} mode on port ${PORT}`,
  )
  console.log(`🟢 Online on ${API_URL}`)
})
