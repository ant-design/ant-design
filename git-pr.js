const { spawnSync } = require('node:child_process');

function consoleStd(std) {
  const output = std.stdout.toString();
  const error = std.stderr.toString();

  if (output) {
    console.log(output);
  }
  if (error) {
    console.log(error);
  }
}

const repo = process.argv[process.argv.length - 1];

const [userName, branchName] = repo.split(':');

console.log('Track Stream:', repo, '\n');

const remoteOrigin = spawnSync('git', ['remote', 'get-url', 'origin']).stdout.toString().trim();
console.log('Remote Origin:', remoteOrigin);

const target = `https://github.com/${userName}/ant-design`;

console.log('Source:', remoteOrigin);
console.log('Target:', target, '\n');

// Remove remote first
console.log('Clean TMP remote...');
const remoteRemove = spawnSync('git', ['remote', 'remove', 'tmp']);
consoleStd(remoteRemove);

// Add Remote
console.log('Add TMP remote...');
const remoteAdd = spawnSync('git', ['remote', 'add', 'tmp', target]);
consoleStd(remoteAdd);

// Fetch git fetch tmp featur/expand-action
const fetchBR = spawnSync('git', ['fetch', 'tmp', branchName]);
consoleStd(fetchBR);

// Checkout
const checkout = spawnSync('git', ['checkout', '-b', branchName, `tmp/${branchName}`]);
consoleStd(checkout);
