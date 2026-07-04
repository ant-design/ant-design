import { vi } from 'vitest';

import { version as packageVersion } from '../package.json';

const testDist = process.env.LIB_DIR === 'dist';
const testDistMin = process.env.LIB_DIR === 'dist-min';

async function loadAntd(): Promise<Record<PropertyKey, any>> {
  if (testDist) {
    return vi.importActual('../dist/antd');
  }
  if (testDistMin) {
    return vi.importActual('../dist/antd.min');
  }
  return vi.importActual('../components');
}

describe('antd dist files', () => {
  // https://github.com/ant-design/ant-design/issues/1638
  // https://github.com/ant-design/ant-design/issues/1968
  it('exports modules correctly', async () => {
    const antd = await loadAntd();
    expect(Object.keys(antd)).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/1970
  // https://github.com/ant-design/ant-design/issues/1804
  if (testDist) {
    it('antd.js should export version', async () => {
      const antd = await vi.importActual<Record<PropertyKey, any>>('../dist/antd');
      expect(antd).toBeTruthy();
      expect(antd.version).toBe(packageVersion);
    });

    it('antd.min.js should export version', async () => {
      const antd = await vi.importActual<Record<PropertyKey, any>>('../dist/antd.min');
      expect(antd).toBeTruthy();
      expect(antd.version).toBe(packageVersion);
    });
  }
});
