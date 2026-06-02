// PM2 ecosystem config — Pilih Koper (standalone, port 5283).
// nginx reverse-proxies telkomsel4.qlipmobile.com → 127.0.0.1:5283.

module.exports = {
  apps: [
    {
      name: 'tsel-koper',
      cwd: '/home/qlip/tsel-koper',
      script: 'server.mjs',
      interpreter: 'node',
      instances: 1,
      exec_mode: 'fork',

      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: '5283',
      },

      // Restart behavior
      autorestart: true,
      watch: false,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 2000,
      max_memory_restart: '500M',

      // Logs
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: '/home/qlip/tsel-koper/logs/tsel-koper.err.log',
      out_file: '/home/qlip/tsel-koper/logs/tsel-koper.out.log',
      merge_logs: true,
      time: true,
    },
  ],
}
