import { defineConfig } from 'dumi';
import path from 'path';
import rehypeAntd from './.dumi/rehypeAntd';
import { version } from './package.json';

export default defineConfig({
  outputPath: '_site',
  favicons: ['https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png'],
  resolve: {
    docDirs: [{ type: 'doc', dir: 'docs' }],
    atomDirs: [{ type: 'component', dir: 'components' }],
    codeBlockMode: 'passive',
  },
  locales: [
    { id: 'en-US', name: 'English', suffix: '' },
    { id: 'zh-CN', name: '中文', suffix: '-cn' },
  ],
  define: {
    antdReproduceVersion: version,
  },
  theme: {
    '@root-entry-name': 'default',
  },
  alias: {
    'antd/lib': path.join(__dirname, 'components'),
    'antd/es': path.join(__dirname, 'components'),
    // Change antd from `index.js` to `.dumi/theme/antd.js` to remove deps of root style
    antd: require.resolve('./.dumi/theme/antd.js'),
  },
  plugins: [require.resolve('./.dumi/plugin.ts')],
  extraRehypePlugins: [rehypeAntd],
  extraBabelPresets: ['@emotion/babel-preset-css-prop'],
  mfsu: false,
});
