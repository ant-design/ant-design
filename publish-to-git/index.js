const Promise = require('bluebird');
const childProcess = require('child_process');
const fs = require('fs');
const tar = require('tar');
const path = require('path');
const tmp = require('tmp');

Promise.promisifyAll(childProcess);
Promise.promisifyAll(fs);
Promise.promisifyAll(tar);
Promise.promisifyAll(tmp);

const { execFileAsync, spawn } = childProcess;
const { unlinkAsync } = fs;

tmp.setGracefulCleanup();

function spawnNpmWithOutput(args, options) {
  if (!options.verbose) {
    return execFileAsync(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', args, options);
  }

  return new Promise((resolve, reject) => {
    const proc = spawn(
      /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
      args,
      Object.assign(options, {
        stdio: ['inherit', 'pipe', 'inherit'],
        env: {
          ...process.env,
          ...(Boolean(process.stdout.isTTY) && {
            NPM_CONFIG_COLOR: 'always',
          }),
        },
      }),
    );
    let outData = '';
    proc.on('exit', exitCode => {
      if (exitCode === 0) {
        resolve(outData);
      }
      reject(new Error(`npm failed with error code ${exitCode}`));
    });
    proc.on('error', reject);
    proc.stdout.on('data', data => {
      outData += data.toString('utf8');
    });
  });
}

async function packWithNpm({ sourceDir, targetDir, verbose }) {
  const output = (
    await spawnNpmWithOutput(['pack', sourceDir], {
      cwd: targetDir,
      verbose,
      maxBuffer: Infinity,
    })
  )
    .trim()
    .split(/\n/);
  const packedFile = output[output.length - 1];
  const packedFileAbsolute = path.join(path.resolve(targetDir), packedFile);

  try {
    await tar.extractAsync({
      strip: 1,
      cwd: targetDir,
      file: packedFileAbsolute,
    });
  } finally {
    await unlinkAsync(packedFileAbsolute);
  }
}

async function publish({ tag, version, push, packOptions }, pack = packWithNpm) {
  if (!tag) {
    tag = `v${version}`;
  }

  const tmpRepoDir = await tmp.dirAsync();
  const temporaryRemote = path.basename(tmpRepoDir);

  const git = (...args) => execFileAsync('git', args, { maxBuffer: Infinity });
  const gitInTmpRepo = (...args) =>
    execFileAsync('git', args, {
      cwd: tmpRepoDir,
      maxBuffer: Infinity,
    });

  try {
    const gitInitPromise = gitInTmpRepo('init');

    await pack({ sourceDir: process.cwd(), targetDir: tmpRepoDir, ...packOptions });

    await gitInitPromise;
    await gitInTmpRepo('add', '-A');

    const currentCommitMessage = (
      await git('log', '-n', '1', '--pretty=oneline', '--decorate=full')
    ).trim();
    const message = `Published by Ant Design
${currentCommitMessage}`;

    await gitInTmpRepo('commit', '-m', message);

    await git('remote', 'add', '-f', temporaryRemote, tmpRepoDir);

    const forceOptions = push.force ? ['-f'] : [];

    await git('tag', ...forceOptions, tag, `${temporaryRemote}/master`);

    if (push) {
      console.warn(`Pushing to remote ${push.remote}`);

      try {
        await git('push', ...forceOptions, push.remote || 'origin', tag);
      } catch (err) {
        await git('tag', '-d', tag);
        throw err;
      }
      console.log(`Pushed tag to ${push.remote} with tag: ${tag}`);
    } else {
      console.log(`Created local tag: ${tag}`);
    }
  } finally {
    try {
      await git('remote', 'remove', temporaryRemote);
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
}

module.exports = { publish, packWithNpm };
