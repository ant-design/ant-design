// jest-puppeteer.config.js
module.exports = {
  launch: {
    headless: process.env.CI === 'true' ? 'new' : false,
    ignoreDefaultArgs: ['--disable-extensions'],
    executablePath: 'chrome.exe',
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
