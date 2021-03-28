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
  deploy: {
    // "production" is the environment name
    production: {
      user: 'thejoaov',
      host: ['localhost'],
      ref: 'origin/main',
      repo: 'git@github.com:thejoaov/gobarber-14-server.git',
      path: '/home/thejoaov/www',
      'pre-deploy': 'yarn && yarn build',
    },
  },
}
