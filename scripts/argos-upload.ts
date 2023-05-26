// Thanks to material-ui ❤️
// Create chunks for Argos: https://github.com/mui/material-ui/pull/23518
// https://github.com/mui/material-ui/blob/af81aae3b292ed180e7652a665fad1be2b38a7b3/scripts/pushArgos.js
import argos from '@argos-ci/core';
import childProcess from 'child_process';
import glob from 'fast-glob';
import lodashChunk from 'lodash/chunk';
import util from 'util';

const execFileNode = util.promisify(childProcess.execFile);

function execFile(command: string, args: string[]) {
  return execFileNode(command, args, {
    cwd: process.cwd(),
    env: process.env,
    encoding: 'utf-8',
  });
}

const screenshotsBase = 'imageSnapshots';
const screenshotsChunks = `imageSnapshots-chunks`;
const BATCH_SIZE = 200;

async function cpToTemp(screenshot: string, target: string) {
  await execFile('mkdir', ['-p', target]);
  await execFile('cp', [screenshot, target]);
}

async function run() {
  const screenshots = await glob(`${screenshotsBase}/**/*`);
  const chunks = lodashChunk<string>(screenshots, BATCH_SIZE);

  await Promise.all(
    chunks.map((chunk, chunkIndex) =>
      Promise.all(
        chunk.map<Promise<void>>((screenshot) =>
          cpToTemp(screenshot, `${screenshotsChunks}/${chunkIndex}`),
        ),
      ),
    ),
  );

  for (let i = 0; i < chunks.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const result = await argos.upload({
      root: `${screenshotsChunks}/${i}`,
      token: process.env.ARGOS_TOKEN,
      parallel: {
        total: chunks.length,
        nonce: process.env.ARGOS_PARALLEL_NONCE || process.env.CIRCLE_BUILD_NUM || '',
      },
    });
    // eslint-disable-next-line no-console -- pipe stdout
    console.log(result);
  }
}

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
