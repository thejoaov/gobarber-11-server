import 'dotenv/config'
import { ConnectionOptions, DbOptions } from 'typeorm'

const devConfig: Array<ConnectionOptions | DbOptions> = [
  {
    name: 'default',
    migrationsRun: true,
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
    cli: {
      entitiesDir: './src/modules/**/infra/typeorm/entities',
      migrationsDir: './src/shared/infra/typeorm/migrations',
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    host: process.env.MONGO_HOST,
    port: 27017,
    database: process.env.MONGO_NAME,
    useUnifiedTopology: true,
    entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
  },
]

const prodConfig: Array<ConnectionOptions | DbOptions> = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    migrationsRun: true,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ['./dist/modules/**/infra/typeorm/entities/*.js'],
    migrations: ['./dist/shared/infra/typeorm/migrations/*.js'],
    cli: {
      entitiesDir: './dist/modules/**/infra/typeorm/entities',
      migrationsDir: './dist/shared/infra/typeorm/migrations',
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    url: process.env.MONGO_URL,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    entities: ['./dist/src/modules/**/infra/typeorm/schemas/*.js'],
  },
]

export = process.env.NODE_ENV === 'development' ? devConfig : prodConfig
