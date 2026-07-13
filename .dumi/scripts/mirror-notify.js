(function createMirrorModal() {
  const SIGN = Symbol.for('antd.mirror-notify');
  const always = window.localStorage.getItem('DEBUG') === 'antd';
  const officialChinaMirror = 'https://ant-design.antgroup.com?utm_source=mirror-notify';

  const enabledCondition = [
    // Check if the browser language is Chinese
    navigator.languages.includes('zh') || navigator.languages.includes('zh-CN'),
    // Check if the URL path ends with -cn
    /-cn\/?$/.test(window.location.pathname),
    // chinese mirror URL
    !['ant-design.gitee.io', new URL(officialChinaMirror).hostname].includes(
      window.location.hostname,
    ),
    // PR review URL
    !window.location.host.includes('surge'),
    // development mode
    !['127.0.0.1', 'localhost'].includes(window.location.hostname),
  ];

  const isEnabled = always || enabledCondition.every(Boolean);

  if (!isEnabled) {
    return;
  }

  const prefixCls = 'antd-mirror-notify';
  const primaryColor = '#1677ff';

  function insertCss() {
    const style = document.createElement('style');
    // Use textContent instead of innerHTML to avoid injecting dynamic values into HTML
    style.textContent = [
      '@keyframes slideInRight {',
      '  from { transform: translate3d(100%, 0, 0); visibility: visible; }',
      '  to { transform: translate3d(0, 0, 0); }',
      '}',
      '.' + prefixCls + ' {',
      '  position: fixed; inset-inline-end: 12px; inset-block-start: 12px;',
      '  z-index: 9999; width: 360px; background-color: #fff;',
      '  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); border-radius: 4px;',
      '  overflow: hidden; animation: slideInRight 0.3s ease-in-out;',
      '}',
      '.' + prefixCls + '-content { padding: 16px; }',
      '.' + prefixCls + '-content a {',
      '  color: ' + primaryColor + '; text-decoration: none;',
      '}',
      '.' + prefixCls + '-content a:hover { text-decoration: underline; }',
      '.' + prefixCls + '-title {',
      '  font-size: 16px; font-weight: bold; margin-block-end: 8px;',
      '}',
      '.' + prefixCls + '-message { font-size: 14px; color: #555; line-height: 1.57; }',
      '.' + prefixCls + '-footer {',
      '  display: none; margin-block-start: 16px; justify-content: flex-end;',
      '}',
      '.' + prefixCls + '-progress {',
      '  position: relative; inset-inline-end: 0; width: 100%; height: 4px;',
      '  background-color: #f0f0f0; border-radius: 2px; overflow: hidden;',
      '}',
      '.' + prefixCls + '-progress::after {',
      "  content: ''; position: absolute; top: 0; inset-inline-start: 0;",
      '  height: 100%; width: var(--progress, 0%);',
      '  background-color: ' + primaryColor + '; transition: width 0.05s linear;',
      '}',
      '.' + prefixCls + '-close {',
      '  all: unset; position: absolute; inset-inline-end: 2px; inset-block-start: 2px;',
      '  width: 32px; height: 32px; font-size: 16px; display: flex;',
      '  align-items: center; justify-content: center; color: #999; cursor: pointer;',
      '}',
      '.' + prefixCls + '-close:hover { color: #333; }',
      '.' + prefixCls + '-action {',
      '  all: unset; display: inline-block; padding: 4px 8px;',
      '  background-color: ' + primaryColor + '; color: #fff;',
      '  border-radius: 4px; text-align: center; cursor: pointer; font-size: 14px;',
      '}',
    ].join('\n');

    document.head.append(style);
  }

  function createNotification() {
    insertCss();

    const notify = document.createElement('div');
    notify.className = prefixCls + ' slideInRight';
    // Build notification DOM safely without innerHTML template literals
    const contentEl = document.createElement('div');
    contentEl.className = prefixCls + '-content';

    const titleEl = document.createElement('div');
    titleEl.className = prefixCls + '-title';
    titleEl.textContent = '🇨🇳 访问不畅？试试国内镜像';
    contentEl.appendChild(titleEl);

    const messageEl = document.createElement('div');
    messageEl.className = prefixCls + '-message';
    messageEl.appendChild(document.createTextNode('国内镜像站点可以帮助您更快地访问文档和资源。'));
    messageEl.appendChild(document.createElement('br'));
    messageEl.appendChild(document.createTextNode('请尝试访问 '));
    const mirrorLink = document.createElement('a');
    mirrorLink.className = prefixCls + '-link';
    // Set href via DOM API to safely assign the URL without HTML injection
    mirrorLink.href = officialChinaMirror;
    mirrorLink.textContent = '国内镜像站点';
    messageEl.appendChild(mirrorLink);
    messageEl.appendChild(document.createTextNode('，以获得更好的体验。'));
    contentEl.appendChild(messageEl);

    const footerEl = document.createElement('div');
    footerEl.className = prefixCls + '-footer';
    const actionBtn = document.createElement('button');
    actionBtn.className = prefixCls + '-action ' + prefixCls + '-link';
    actionBtn.textContent = '🚀 立即前往';
    footerEl.appendChild(actionBtn);
    contentEl.appendChild(footerEl);

    notify.appendChild(contentEl);

    const closeBtn = document.createElement('button');
    closeBtn.className = prefixCls + '-close';
    closeBtn.textContent = 'X';
    notify.appendChild(closeBtn);

    const progressBar = document.createElement('div');
    progressBar.className = prefixCls + '-progress';
    progressBar.style.setProperty('--progress', '100%');
    notify.appendChild(progressBar);
    document.body.appendChild(notify);

    closeBtn.addEventListener('click', () => {
      removeNotify();
    });

    const goToChinaMirror = (event) => {
      event.preventDefault();
      if (window.gtag) {
        window.gtag('event', '点击', {
          event_category: '前往国内镜像',
          event_label: officialChinaMirror,
        });
      }
      window.location.href = officialChinaMirror;
      removeNotify();
    };

    [mirrorLink, actionBtn].forEach((link) => {
      link.addEventListener('click', goToChinaMirror);
    });

    const refreshRate = 50; // ms
    const duration = 10; // s
    const step = 100 / ((duration * 1000) / refreshRate);
    let progressInterval = -1;

    function removeNotify() {
      clearInterval(progressInterval);
      notify.remove();
    }

    let currentProgressValue = 100;

    const progress = {
      get value() {
        return currentProgressValue;
      },
      set value(val) {
        currentProgressValue = Math.max(0, Math.min(100, val));
        progressBar.style.setProperty('--progress', currentProgressValue + '%');
      },
    };

    function startProgressTimer() {
      if (progressInterval !== -1) {
        clearInterval(progressInterval);
      }
      progressInterval = setInterval(() => {
        if (progress.value <= 0) {
          removeNotify();
        } else {
          progress.value -= step;
        }
      }, refreshRate);
    }

    startProgressTimer();

    notify.addEventListener('mouseenter', () => {
      clearInterval(progressInterval);
    });

    notify.addEventListener('mouseleave', () => {
      startProgressTimer();
    });
  }

  function checkMirrorAvailable(timeout = 1500) {
    return new Promise((resolve) => {
      const img = new Image();
      let done = false;
      img.onload = () => {
        if (!done) {
          done = true;
          resolve(true);
        }
      };
      img.onerror = () => {
        if (!done) {
          done = true;
          resolve(false);
        }
      };
      img.src = new URL('/llms.txt', officialChinaMirror).href;
      setTimeout(() => {
        if (!done) {
          done = true;
          resolve(false);
        }
      }, timeout);
    });
  }

  // 断定网络不畅阈值（秒）
  const delayDuration = 3;

  const reactTimeoutId = setTimeout(() => {
    if (typeof window[SIGN]?.YES === 'undefined') {
      console.error(
        'antd.mirror-notify: 页面加载超过 %s 秒，可能是网络不畅。\n请尝试访问国内镜像站点。%c%s',
        delayDuration,
        'color: #1677ff; font-weight: bold;',
        officialChinaMirror,
      );
      checkMirrorAvailable().then((isFast) => {
        if (isFast) {
          createNotification();
        }
      });
    }
  }, delayDuration * 1000);

  // 交给 React effect 清理
  window[SIGN] = function stopMirrorNotify() {
    window[SIGN].YES = Date.now();
    clearTimeout(reactTimeoutId);
  };
})();
