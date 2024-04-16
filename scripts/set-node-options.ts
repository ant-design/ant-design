import os from 'os';

const childProcess = require('child_process');

const totalMemory = Math.floor(os.totalmem() / (1024 * 1024));

if (totalMemory <= 8192) {
  // setting NODE_OPTIONS
  process.env.NODE_OPTIONS = '--max-old-space-size=4096';
}
// Execute project startup command
const args: string[] = process.argv.slice(2);

childProcess.execSync(` ${args.join(' ')}`, { stdio: 'inherit' });
