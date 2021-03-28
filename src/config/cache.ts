import { RedisOptions } from 'ioredis'

interface ICacheConfig {
  driver: 'redis'

  config: {
    redis: RedisOptions
  }
}

export default {
  driver: 'redis',

  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || undefined,
      username: process.env.REDIS_USER || undefined,
      reconnectOnError: (error): boolean => {
        console.log('Always reconnect on error', error)
        return true
      },
    },
  },
} as ICacheConfig
