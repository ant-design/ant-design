/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { join } from 'path';

import { createServer } from 'http-server';
import uniq from 'lodash/uniq';

async function getAllComponentMds() {
  const { glob } = await import('glob');
  const mds = await glob('components/!(overview|_util)/demo/*.md', {
    cwd: join(process.cwd()),
    dot: false,
  });
  // ~demos/components-button-demo-basic

  const result = mds.map((path) => path.replace('.md', '').replace(/\//g, '-'));
  return result;
}

async function createSiteServer() {
  const port = 3000;
  const server = createServer({ root: join(process.cwd(), '_site') });
  server.listen(port);
  return server;
}

getAllComponentMds();
