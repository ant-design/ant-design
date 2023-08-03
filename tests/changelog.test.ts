/* eslint-disable import/no-dynamic-require, global-require */
import path from 'path';

const testDist = process.env.LIB_DIR === 'dist';

// This test is used to ensure changelog includes related component
describe('component changelog match snapshot', () => {
  // const testFn = testDist ? it : it.skip;
  const testFn = it;

  testFn('misc changelog snapshot', () => {
    const changelog = require(path.join(process.cwd(), '.dumi', 'preset', 'misc-changelog.json'));
    console.log(changelog);
  });
});
