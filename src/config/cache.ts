import { RedisOptions } from 'ioredis'

interface ICacheConfig {
  driver: 'redis'

  config: {
    redis: RedisOptions | string
  }
}

export default {
  driver: 'redis',

  config: {
    redis:
      process.env.NODE_ENV === 'production'
        ? process.env.REDIS_URL
        : {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASS || undefined,
          },
  },
} as ICacheConfig
