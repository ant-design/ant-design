import { defineConfig } from 'dumi';
import path from 'path';
import rehypeAntd from './.dumi/rehypeAntd';
import remarkAntd from './.dumi/remarkAntd';
import { version } from './package.json';

export default defineConfig({
  conventionRoutes: {
    // to avoid generate routes for .dumi/pages/index/components/xx
    exclude: [new RegExp('index/components/')],
  },
  ssr: process.env.NODE_ENV === 'production' ? {} : false,
  hash: true,
  mfsu: false,
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
      rel: 'preload',
      as: 'font',
      href: '//at.alicdn.com/t/webfont_6e11e43nfj.woff2',
      type: 'font/woff2',
      crossorigin: true,
    },
    {
      rel: 'preload',
      as: 'font',
      href: '//at.alicdn.com/t/webfont_6e11e43nfj.woff',
      type: 'font/woff',
      crossorigin: true,
    },
    {
      rel: 'preload',
      as: 'font',
      href: '//at.alicdn.com/t/webfont_6e11e43nfj.ttf',
      type: 'font/ttf',
      crossorigin: true,
    },
    {
      rel: 'preload',
      as: 'font',
      href: '//at.alicdn.com/t/webfont_exesdog9toj.woff2',
      type: 'font/woff2',
      crossorigin: true,
    },
    {
      rel: 'preload',
      as: 'font',
      href: '//at.alicdn.com/t/webfont_exesdog9toj.woff',
      type: 'font/woff',
      crossorigin: true,
    },
    {
      rel: 'preload',
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
      content: `
(function createMirrorModal() {
  if (
    navigator.languages.includes('zh')
    && /-cn\\/?$/.test(window.location.pathname)
    && !['ant-design.gitee.io', 'ant-design.antgroup.com'].includes(window.location.hostname)
  ) {
    const ANTD_DOT_NOT_SHOW_MIRROR_MODAL = 'ANT_DESIGN_DO_NOT_OPEN_MIRROR_MODAL';

    const lastShowTime = window.localStorage.getItem(ANTD_DOT_NOT_SHOW_MIRROR_MODAL);
    if (lastShowTime && lastShowTime !== 'true' && new Date().getTime() - new Date(lastShowTime).getTime() < 7 * 24 * 60 * 60 * 1000) {
      return;
    }

    const style = document.createElement('style');
    style.innerHTML = \`
  @keyframes mirror-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes mirror-zoom-in {
    from {
      transform: scale(0.8);
    }
    to {
      transform: scale(1);
    }
  }

  .mirror-modal-mask {
    position: fixed;
    inset: 0;
    height: '100vh';
    width: '100vw';
    background: rgba(0, 0, 0, 0.3);
    z-index: 9999;
    animation: mirror-fade-in 0.3s forwards;
  }

  .mirror-modal-dialog {
    position: fixed;
    inset: 0;
    margin: auto;
    width: 400px;
    height: 120px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 8px;
    border: 1px solid #eee;
    background: #fff;
    padding: 20px 24px;
    animation: mirror-zoom-in 0.3s forwards;
  }

  .mirror-modal-title {
    font-size: 16px;
    font-weight: 500;
    align-self: flex-start;
    margin-bottom: 8px;
  }

  .mirror-modal-content {
    font-size: 14px;
    align-self: flex-start;
    margin-bottom: 16px;
  }

  .mirror-modal-btns {
    align-self: flex-end;
    margin-top: auto;
    display: flex;
    align-items: center;
  }

  .mirror-modal-btn {
    border-radius: 6px;
    cursor: pointer;
    height: 32px;
    box-sizing: border-box;
    font-size: 14px;
    padding: 4px 16px;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }

  .mirror-modal-confirm-btn {
    background: #1677ff;
    color: #fff;
  }

  .mirror-modal-confirm-btn:hover {
    background: #4096ff;
  }

  .mirror-modal-confirm-btn:active {
    background: #0958d9;
  }

  .mirror-modal-cancel-btn {
    border: 1px solid #eee;
    color: #000;
    margin-right: 8px;
  }

  .mirror-modal-cancel-btn:hover {
    border-color: #4096ff;
    color: #4096ff
  }

  .mirror-modal-cancel-btn:active {
    border-color: #0958d9;
    color: #0958d9;
  }
    \`;
    document.head.append(style);

    const modal = document.createElement('div');
    modal.className = 'mirror-modal-mask';

    const dialog = document.createElement('div');
    dialog.className = 'mirror-modal-dialog';
    modal.append(dialog);

    const title = document.createElement('div');
    title.className = 'mirror-modal-title';
    title.innerText = '提示';
    dialog.append(title);

    const content = document.createElement('div');
    content.className = 'mirror-modal-content';
    content.innerText = '国内用户推荐访问国内镜像以获得极速体验～';
    dialog.append(content);

    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'mirror-modal-btns';
    dialog.append(btnWrapper);

    const cancelBtn = document.createElement('a');
    cancelBtn.className = 'mirror-modal-cancel-btn mirror-modal-btn';
    cancelBtn.innerText = '7 天内不再显示';
    btnWrapper.append(cancelBtn);
    cancelBtn.addEventListener('click', () => {
      window.localStorage.setItem(ANTD_DOT_NOT_SHOW_MIRROR_MODAL, new Date().toISOString());
      document.body.removeChild(modal);
      document.head.removeChild(style);
      document.body.style.overflow = '';
    });

    const confirmBtn = document.createElement('a');
    confirmBtn.className = 'mirror-modal-confirm-btn mirror-modal-btn';
    confirmBtn.href = 'https://ant-design.antgroup.com/';
    confirmBtn.innerText = '🚀 立刻前往';
    btnWrapper.append(confirmBtn);

    document.body.append(modal);
    document.body.style.overflow = 'hidden';
  }
})();
`,
    },
  ],
});
