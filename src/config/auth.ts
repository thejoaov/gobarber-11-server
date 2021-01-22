import { createHash } from 'crypto'

export default {
  jwt: {
    secret: createHash('md5')
      .update(process.env.SECRET || 'default')
      .digest('hex'),
    expiresIn: '1d',
  },
}
