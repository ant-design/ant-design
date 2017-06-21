import pkg from '../package.json';

describe('antd dist files', () => {
  // https://github.com/ant-design/ant-design/issues/1638
  // https://github.com/ant-design/ant-design/issues/1968
  it('exports modules correctly', () => {
    const antd = process.env.CI ? require('../dist/antd') : require('../components'); // eslint-disable-line global-require
    expect(Object.keys(antd)).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/1970
  // https://github.com/ant-design/ant-design/issues/1804
  if (process.env.CI) {
    it('should have antd.version', () => {
      const antd = require('../dist/antd'); // eslint-disable-line global-require
      expect(antd.version).toBe(pkg.version);
    });
  }
});
