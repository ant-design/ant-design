const util = require('util');
const glob = require('glob');
const fse = require('fs-extra');
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
const screenshotsTmp = 'imageSnapshotsTemp';
const BATCH_SIZE = 200;

async function run() {
  const screenshots = await glob(`${screenshotsBase}/**/*`);
  const chunks = lodashChunk(screenshots, BATCH_SIZE);

  await Promise.all(
    chunks.map((chunk, chunkIndex) =>
      Promise.all(
        chunk.map((screenshot) => {
          return fse.move(
            screenshot,
            `${screenshotsTmp}/${chunkIndex}/${screenshot.replace(screenshotsBase, '')}`,
          );
        }),
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
      process.env.GITHUB_REF_NAME,
      '--commit',
      process.env.GITHUB_SHA,
      '--external-build-id',
      process.env.GITHUB_SHA,
    ]);
    // eslint-disable-next-line no-console -- pipe stdout
    console.log(argosResults.stdout);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
