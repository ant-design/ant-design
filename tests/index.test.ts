import { version as packageVersion } from '../package.json';

const testDist = process.env.LIB_DIR === 'dist';
const testDistMin = process.env.LIB_DIR === 'dist-min';

function loadAntd(): Record<PropertyKey, any> {
  if (testDist) {
    return jest.requireActual('../dist/antd');
  }
  if (testDistMin) {
    return jest.requireActual('../dist/antd.min');
  }
  return jest.requireActual('../components');
}

describe('antd dist files', () => {
  // https://github.com/ant-design/ant-design/issues/1638
  // https://github.com/ant-design/ant-design/issues/1968
  it('exports modules correctly', () => {
    const antd = loadAntd();
    expect(Object.keys(antd)).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/1970
  // https://github.com/ant-design/ant-design/issues/1804
  if (testDist) {
    it('antd.js should export version', () => {
      const antd = jest.requireActual('../dist/antd');
      expect(antd).toBeTruthy();
      expect(antd.version).toBe(packageVersion);
    });

    it('antd.min.js should export version', () => {
      const antd = jest.requireActual('../dist/antd.min');
      expect(antd).toBeTruthy();
      expect(antd.version).toBe(packageVersion);
    });
  }
});
