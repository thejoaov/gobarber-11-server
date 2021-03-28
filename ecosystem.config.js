require('dotenv/config')
const { exec } = require('child_process')

module.exports = {
  apps: [
    {
      script: 'dist/shared/infra/http/server.js',
      exec_mode: 'cluster',
      instances: process.env.INSTANCES || 'max',
      env: {
        NODE_ENV: process.env.NODE_ENV,
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
