import pkg from '../package.json';

const testDist = process.env.LIB_DIR === 'dist';

describe('antd dist files', () => {
  // https://github.com/ant-design/ant-design/issues/1638
  // https://github.com/ant-design/ant-design/issues/1968
  it('exports modules correctly', () => {
    const antd = testDist ? require('../dist/antd') : require('../components'); // eslint-disable-line global-require
    expect(Object.keys(antd)).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/1970
  // https://github.com/ant-design/ant-design/issues/1804
  if (testDist) {
    it('should have antd.version', () => {
      const antd = require('../dist/antd'); // eslint-disable-line global-require
      expect(antd.version).toBe(pkg.version);
    });
  }
});
