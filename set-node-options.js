const os = require('os');
const childProcess = require('child_process');

const totalMemory = Math.floor(os.totalmem() / (1024 * 1024));

let maxOldSpaceSize;
if (totalMemory <= 8192) {
  maxOldSpaceSize = 4096;
} else if (totalMemory <= 16384) {
  maxOldSpaceSize = 4096;
} else {
  maxOldSpaceSize = 8192;
}

// 设置 NODE_OPTIONS
const nodeArgs = `--max-old-space-size=${maxOldSpaceSize}`;
process.env.NODE_OPTIONS = nodeArgs;

// 执行项目启动命令
const args = process.argv.slice(2);

childProcess.execSync(` ${args.join(' ')}`, { stdio: 'inherit' });
