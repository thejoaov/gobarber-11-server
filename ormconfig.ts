import { ConnectionOptions } from 'typeorm'

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME,
  MONGO_PORT,
  MONGO_NAME,
  MONGO_HOST,
  MONGO_URL,
  NODE_ENV,
} = process.env

const dbConfig: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: DB_HOST || 'localhost',
  port: Number(DB_PORT || 5432),
  username: DB_USER || 'pg',
  password: DB_PASS || '',
  database: DB_NAME || 'gostack11_gobarber',
  migrationsRun: true,
  synchronize: false,
  entities: ['./src/modules/**/infra/typeorm/entities/*{.ts,.js}'],
  migrations: ['./src/shared/infra/typeorm/migrations/*{.ts,.js}'],
  cli: {
    entitiesDir: './src/modules/**/infra/typeorm/entities',
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
}

const mongoConfig: ConnectionOptions =
  MONGO_URL && NODE_ENV === 'production'
    ? {
        name: 'mongo',
        type: 'mongodb',
        url: MONGO_URL,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        synchronize: true,
        logging: false,
        entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
      }
    : {
        name: 'mongo',
        type: 'mongodb',
        host: MONGO_HOST || 'localhost',
        port: Number(MONGO_PORT || 27017),
        database: MONGO_NAME || 'gostack11_gobarber',
        useUnifiedTopology: true,
        logging: true,
        entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
      }

export default [dbConfig, mongoConfig]
