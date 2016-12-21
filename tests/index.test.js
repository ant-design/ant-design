// Test dist files
import fs from 'fs';
import path from 'path';

describe('antd dist files', () => {
  const distFilesExisted = fs.existsSync(path.join(process.cwd(), 'dist', 'antd.js'));
  if (!distFilesExisted) {
    it('empty test case placeholder', () => {});
    return;
  }

  const antd = require('../dist/antd'); // eslint-disable-line global-require

  // https://github.com/ant-design/ant-design/issues/1638
  // https://github.com/ant-design/ant-design/issues/1968
  it('exports modules correctly', () => {
    expect(Object.keys(antd)).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/1970
  // https://github.com/ant-design/ant-design/issues/1804
  it('should be compatible in IE8', () => {
    const antdJsContent = fs.readFileSync(path.join(process.cwd(), 'dist', 'antd.js'));
    expect(
      antdJsContent.toString()
       .indexOf('function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }')
    ).toBe(-1);
  });
});
