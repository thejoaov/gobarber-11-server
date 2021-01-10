const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env

module.exports = {
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
