import { defineConfig } from 'dumi';
import path from 'path';
import rehypeAntd from './.dumi/rehypeAntd';
import remarkAntd from './.dumi/remarkAntd';
import { version } from './package.json';
import * as fs from 'fs-extra';

export default defineConfig({
  plugins: ['dumi-plugin-color-chunk'],
  conventionRoutes: {
    // to avoid generate routes for .dumi/pages/index/components/xx
    exclude: [new RegExp('index/components/')],
  },
  ssr: process.env.NODE_ENV === 'production' ? {} : false,
  hash: true,
  mfsu: false,
  live: true,
  crossorigin: {},
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
  alias: {
    'antd/lib': path.join(__dirname, 'components'),
    'antd/es': path.join(__dirname, 'components'),
    'antd/locale': path.join(__dirname, 'components/locale'),
    antd: path.join(__dirname, 'components'),
  },
  extraRehypePlugins: [rehypeAntd],
  extraRemarkPlugins: [remarkAntd],
  metas: [{ name: 'theme-color', content: '#1677ff' }],
  analytics: {
    ga_v2: 'UA-72788897-1',
  },
  analyze: {
    analyzerPort: 'auto',
  },
  links: [
    {
      rel: 'prefetch',
      as: 'font',
      href: '//at.alicdn.com/t/webfont_6e11e43nfj.woff2',
      type: 'font/woff2',
      crossorigin: true,
    },
    {
      rel: 'prefetch',
      as: 'font',
      href: '//at.alicdn.com/t/webfont_6e11e43nfj.woff',
      type: 'font/woff',
      crossorigin: true,
    },
    {
      rel: 'prefetch',
      as: 'font',
      href: '//at.alicdn.com/t/webfont_6e11e43nfj.ttf',
      type: 'font/ttf',
      crossorigin: true,
    },
    {
      rel: 'prefetch',
      as: 'font',
      href: '//at.alicdn.com/t/webfont_exesdog9toj.woff2',
      type: 'font/woff2',
      crossorigin: true,
    },
    {
      rel: 'prefetch',
      as: 'font',
      href: '//at.alicdn.com/t/webfont_exesdog9toj.woff',
      type: 'font/woff',
      crossorigin: true,
    },
    {
      rel: 'prefetch',
      as: 'font',
      href: '//at.alicdn.com/t/webfont_exesdog9toj.ttf',
      type: 'font/ttf',
      crossorigin: true,
    },
    {
      rel: 'preload',
      as: 'font',
      href: '//at.alicdn.com/wf/webfont/exMpJIukiCms/Gsw2PSKrftc1yNWMNlXgw.woff2',
      type: 'font/woff2',
      crossorigin: true,
    },
    {
      rel: 'preload',
      as: 'font',
      href: '//at.alicdn.com/wf/webfont/exMpJIukiCms/vtu73by4O2gEBcvBuLgeu.woff',
      type: 'font/woff2',
      crossorigin: true,
    },
  ],
  headScripts: [
    `
    (function () {
      function isLocalStorageNameSupported() {
        const testKey = 'test';
        const storage = window.localStorage;
        try {
          storage.setItem(testKey, '1');
          storage.removeItem(testKey);
          return true;
        } catch (error) {
          return false;
        }
      }
      // 优先级提高到所有静态资源的前面，语言不对，加载其他静态资源没意义
      const pathname = location.pathname;

      function isZhCN(pathname) {
        return /-cn\\/?$/.test(pathname);
      }
      function getLocalizedPathname(path, zhCN) {
        const pathname = path.indexOf('/') === 0 ? path : '/' + path;
        if (!zhCN) {
          // to enUS
          return /\\/?index(-cn)?/.test(pathname) ? '/' : pathname.replace('-cn', '');
        } else if (pathname === '/') {
          return '/index-cn';
        } else if (pathname.indexOf('/') === pathname.length - 1) {
          return pathname.replace(/\\/$/, '-cn/');
        }
        return pathname + '-cn';
      }

      // 兼容旧的 URL， \`?locale=...\`
      const queryString = location.search;
      if (queryString) {
        const isZhCNConfig = queryString.indexOf('zh-CN') > -1;
        if (isZhCNConfig && !isZhCN(pathname)) {
          location.pathname = getLocalizedPathname(pathname, isZhCNConfig);
        }
      }

      // 首页无视链接里面的语言设置 https://github.com/ant-design/ant-design/issues/4552
      if (isLocalStorageNameSupported() && (pathname === '/' || pathname === '/index-cn')) {
        const lang =
          (window.localStorage && localStorage.getItem('locale')) ||
          ((navigator.language || navigator.browserLanguage).toLowerCase() === 'zh-cn'
            ? 'zh-CN'
            : 'en-US');
        // safari is 'zh-cn', while other browser is 'zh-CN';
        if ((lang === 'zh-CN') !== isZhCN(pathname)) {
          location.pathname = getLocalizedPathname(pathname, lang === 'zh-CN');
        }
      }
      document.documentElement.className += isZhCN(pathname) ? 'zh-cn' : 'en-us';
    })();
    `,
  ],
  scripts: [
    {
      async: true,
      content: fs.readFileSync(path.join(__dirname, '.dumi', 'mirror-modal.js')).toString(),
    },
  ],
});
