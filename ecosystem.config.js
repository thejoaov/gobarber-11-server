require('dotenv').config()

module.exports = {
  apps: [
    {
      script: 'dist/shared/infra/http/server.js',
      exec_mode: 'cluster',
      instances: process.env.INSTANCES || 'max',
      env: {
        NODE_ENV: 'development',
      },
      env_staging: {
        NODE_ENV: 'staging',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
