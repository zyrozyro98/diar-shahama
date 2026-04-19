module.exports = {
  apps: [
    {
      name: 'diar-shahama-frontend',
      script: 'npm',
      args: 'run dev',
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'whatsapp-server',
      script: 'server.js',
      cwd: './whatsapp-server',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      restart_delay: 4000,
      max_restarts: 10,
    },
  ],
};
