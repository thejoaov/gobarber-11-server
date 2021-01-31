import { Request, Response } from 'express'

export default class ServerHealthController {
  public async show(request: Request, response: Response): Promise<Response> {
    const version = process.env.npm_package_version

    const healthcheck = { message: 'Gobarber Server Application', version }

    return response.json(healthcheck)
  }
}
