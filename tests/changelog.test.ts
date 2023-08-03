const testDist = process.env.LIB_DIR === 'dist';

// This test is used to ensure changelog includes related component
describe('component changelog match snapshot', () => {
  // const testFn = testDist ? it : it.skip;
  const testFn = it;

  testFn('misc changelog snapshot', () => {
    console.log('2333', testDist, process.env.LIB_DIR);
  });
});
