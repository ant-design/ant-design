const isCI = require('is-ci');

// jest-puppeteer.config.js
module.exports = {
  launch: {
    ignoreDefaultArgs: ['--disable-extensions'],
    args: [
      // Required for Docker version of Puppeteer
      '--no-sandbox',
      '--disable-setuid-sandbox',
      // This will write shared memory files into /tmp instead of /dev/shm,
      // because Docker’s default for /dev/shm is 64MB
      '--disable-dev-shm-usage',
    ],
  },
  server: {
    command: 'npm run play -- --mode=production',
    host: 'localhost',
    port: 8002,
    launchTimeout: isCI ? 30_000 : 15_000,
    debug: true,
    usedPortAction: 'kill',
  },
};
