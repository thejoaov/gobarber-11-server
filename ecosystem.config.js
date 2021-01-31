module.exports = {
  apps: [
    {
      script: 'dist/shared/infra/http/server.js',
      exec_mode: 'cluster',
      instances: 'max',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
