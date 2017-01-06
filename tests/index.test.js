import fs from 'fs';
import path from 'path';

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
    it('should be compatible in IE8', () => {
      const antdJsContent = fs.readFileSync(path.join(process.cwd(), 'dist', 'antd.js'));
      expect(
        antdJsContent.toString()
        .indexOf('function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }')
      ).toBe(-1);
    });
  }
});
