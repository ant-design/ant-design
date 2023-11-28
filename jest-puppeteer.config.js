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
};
