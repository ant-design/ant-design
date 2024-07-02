/* eslint-disable global-require */
import { version as packageVersion } from '../package.json';
import fs from 'node:fs';
import $ from 'dekko';

const testDist = process.env.LIB_DIR === 'dist';
const testDistMin = process.env.LIB_DIR === 'dist-min';
const includeUseClient = (filename: string) =>
  fs.readFileSync(filename).toString().includes('"use client"');

describe('antd dist files', () => {
  // Run only in latest React version
  if (process.env.React === '16' || process.env.React === '17') {
    return;
  }
  // https://github.com/ant-design/ant-design/issues/1638
  // https://github.com/ant-design/ant-design/issues/1968
  it('exports modules correctly', () => {
    let antd: Record<string, unknown>;
    if (testDist) {
      // eslint-disable-next-line import/no-unresolved
      antd = require('../dist/antd');
    } else if (testDistMin) {
      // eslint-disable-next-line import/no-unresolved
      antd = require('../dist/antd.min');
    } else {
      antd = require('../components');
    }
    expect(Object.keys(antd)).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/1970
  // https://github.com/ant-design/ant-design/issues/1804
  if (testDist) {
    it('antd.js should export version', () => {
      // eslint-disable-next-line global-require,import/no-unresolved
      const antd = require('../dist/antd');
      expect(antd).toBeTruthy();
      expect(antd.version).toBe(packageVersion);
    });

    it('antd.min.js should export version', () => {
      // eslint-disable-next-line global-require,import/no-unresolved
      const antd = require('../dist/antd.min');
      expect(antd).toBeTruthy();
      expect(antd.version).toBe(packageVersion);
    });
  }
});

describe('build files is existed', () => {
  it('lib directory should contain entry file', () => {
    $('lib').isDirectory().hasFile('index.js').hasFile('index.d.ts');
  });

  it('components contain entry file and style directory', () => {
    $('lib/*')
      .filter(
        (filename: string) =>
          !filename.endsWith('index.js') &&
          !filename.endsWith('index.d.ts') &&
          !filename.endsWith('.map'),
      )
      .isDirectory()
      .filter(
        (filename: string) =>
          !filename.endsWith('style') &&
          !filename.endsWith('_util') &&
          !filename.endsWith('locale'),
      )
      .hasFile('index.js')
      .hasFile('index.d.ts');
  });

  it('should have style directory', () => {
    $('lib/*/style').isDirectory();
  });

  it('should contain use client in es/lib files', () => {
    $('{es,lib}/index.js')
      .isFile()
      .assert('contain use client', (filename: string) => includeUseClient(filename));

    $('{es,lib}/*/index.js')
      .isFile()
      .assert('contain use client', (filename: string) => includeUseClient(filename));

    // check tsx files
    $('{es,lib}/typography/*.js')
      .isFile()
      .assert('contain use client', (filename: string) => includeUseClient(filename));

    $('{es,lib}/typography/Base/*.js')
      .isFile()
      .filter((filename: string) => !filename.endsWith('/util.js'))
      .assert('contain use client', (filename: string) => includeUseClient(filename));
  });

  if (testDist) {
    it('should have dist files', () => {
      $('dist')
        .isDirectory()
        .hasFile('antd-with-locales.js')
        .hasFile('antd-with-locales.js.map')
        .hasFile('antd-with-locales.min.js')
        .hasFile('antd-with-locales.min.js.map')
        .hasFile('antd.js')
        .hasFile('antd.js.map')
        .hasFile('antd.min.js')
        .hasFile('antd.min.js.map')
        .hasFile('reset.css');
    });

    it('should not contain use client in dist', () => {
      $('dist/*')
        .isFile()
        .assert("doesn't contain use client", (filename: string) => !includeUseClient(filename));
    });
  }
});
