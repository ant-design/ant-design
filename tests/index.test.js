import pkg from '../package.json';
import { generateThemeFileContent } from '../.antd-tools.config.js';

const testDist = process.env.LIB_DIR === 'dist';

describe('antd dist files', () => {
  // https://github.com/ant-design/ant-design/issues/1638
  // https://github.com/ant-design/ant-design/issues/1968
  it('exports modules correctly', () => {
    // eslint-disable-next-line global-require,import/no-unresolved
    const antd = testDist ? require('../dist/antd') : require('../components');
    expect(Object.keys(antd)).toMatchSnapshot();
  });

  it('generate theme file content', () => {
    const darkContent = `const { darkThemeSingle } = require('./theme');\nconst defaultTheme = require('./default-theme');\n
module.exports = {
  ...defaultTheme,
  ...darkThemeSingle
}`;
    expect(generateThemeFileContent('dark')).toBe(darkContent);
  });

  // https://github.com/ant-design/ant-design/issues/1970
  // https://github.com/ant-design/ant-design/issues/1804
  if (testDist) {
    it('should have antd.version', () => {
      // eslint-disable-next-line global-require,import/no-unresolved
      const antd = require('../dist/antd');
      expect(antd.version).toBe(pkg.version);
    });
  }
});
