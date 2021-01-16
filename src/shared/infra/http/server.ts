import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import 'express-async-errors'
import dotenv from 'dotenv'

import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import routes from './routes'

import '@shared/infra/typeorm'
import '@shared/container'

dotenv.config({ path: '../../../../' })

const app = express()

const { PORT, APP_URL } = process.env

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message })
  }

  console.error(err)

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`)
  console.log(`🟢 Online on ${APP_URL}`)
})
