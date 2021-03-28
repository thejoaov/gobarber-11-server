import { container } from 'tsyringe'
import FakeCacheProvider from './fakes/FakeCacheProvider'

// import RedisCacheProvider from './implementations/RedisCacheProvider'
import ICacheProvider from './models/ICacheProvider'

const providers = {
  redis: FakeCacheProvider,
}

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis)
