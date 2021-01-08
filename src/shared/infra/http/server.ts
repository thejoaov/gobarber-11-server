/* eslint-disable no-console */
import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'

import routes from '@shared/infra/http/routes'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'

import '@shared/infra/typeorm'
import '@shared/container'

const { PORT } = process.env || 3333

const app = express()

app.use(cors())

app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}!`)
})
