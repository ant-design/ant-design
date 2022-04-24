// Thanks to material-ui ❤️
// Create chunks for Argos: https://github.com/mui/material-ui/pull/23518
// https://github.com/mui/material-ui/blob/af81aae3b292ed180e7652a665fad1be2b38a7b3/scripts/pushArgos.js
const util = require('util');
const glob = require('fast-glob');
const lodashChunk = require('lodash/chunk');
const childProcess = require('child_process');

const execFileNode = util.promisify(childProcess.execFile);

function execFile(command, args) {
  return execFileNode(command, args, {
    cwd: process.cwd(),
    env: process.env,
    encoding: 'utf-8',
  });
}

const screenshotsBase = 'imageSnapshots';
const screenshotsTmp = `${screenshotsBase}/temp`;
const BATCH_SIZE = 200;

async function move2Temp(screenshot, target) {
  await execFile('mkdir', ['-p', target]);
  await execFile('mv', [screenshot, target]);
}

async function run() {
  const screenshots = await glob(`${screenshotsBase}/**/*`);
  const chunks = lodashChunk(screenshots, BATCH_SIZE);

  await Promise.all(
    chunks.map((chunk, chunkIndex) =>
      Promise.all(
        chunk.map(screenshot => move2Temp(screenshot, `${screenshotsTmp}/${chunkIndex}`)),
      ),
    ),
  );

  for (let i = 0; i < chunks.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const argosResults = await execFile('argos', [
      'upload',
      `${screenshotsTmp}/${i}`,
      '--token',
      process.env.ARGOS_TOKEN,
      '--batchCount',
      chunks.length,
      '--branch',
      process.env.ARGOS_GITHUB_BRANCH,
      '--commit',
      process.env.ARGOS_GITHUB_COMMIT,
      '--external-build-id',
      process.env.ARGOS_GITHUB_COMMIT,
    ]);
    // eslint-disable-next-line no-console -- pipe stdout
    console.log(argosResults.stdout);
  }
}

run().catch(error => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
