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
    style.innerHTML = `
    @keyframes slideInRight {
      from {
        transform: translate3d(100%, 0, 0);
        visibility: visible;
      }

      to {
        transform: translate3d(0, 0, 0);
      }
    }

    .${prefixCls} {
      position: fixed;
      inset-inline-end: 12px;
      inset-block-start: 12px;
      z-index: 9999;
      width: 360px;
      background-color: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      overflow: hidden;
      animation: slideInRight 0.3s ease-in-out;
    }
    .${prefixCls}-content {
      padding: 16px;
    }
    .${prefixCls}-content a {
      color: ${primaryColor};
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    .${prefixCls}-title {
      font-size: 16px;
      font-weight: bold;
      margin-block-end: 8px;
    }
    .${prefixCls}-message {
      font-size: 14px;
      color: #555;
      line-height: 1.57;
    }
    .${prefixCls}-footer {
      display: none;
      margin-block-start: 16px;
      justify-content: flex-end;
     }

    .${prefixCls}-progress {
      position: relative;
      inset-inline-end: 0;
      width: 100%;
      height: 4px;
      background-color: #f0f0f0;
      border-radius: 2px;
      overflow: hidden;
    }

    .${prefixCls}-progress::after {
      content: '';
      position: absolute;
      top: 0;
      inset-inline-start: 0;
      height: 100%;
      width: var(--progress, 0%);
      background-color: ${primaryColor};
      transition: width 0.05s linear; /* Adjusted for smoother animation matching refreshRate */
    }
    .${prefixCls}-close {
      all: unset;
      position: absolute;
      inset-inline-end: 2px;
      inset-block-start: 2px;
      width: 32px;
      height: 32px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      cursor: pointer;
    }

    .${prefixCls}-close:hover {
      color: #333;
    }

    .${prefixCls}-action {
      all: unset;
      display: inline-block;
      padding: 4px 8px;
      background-color: ${primaryColor};
      color: #fff;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
      font-size: 14px;
    }
  `;

    document.head.append(style);
  }

  function createNotification() {
    insertCss();

    const notify = document.createElement('div');
    notify.className = `${prefixCls} slideInRight`;
    notify.innerHTML = `
    <div class="${prefixCls}-content">
      <div class="${prefixCls}-title">🇨🇳 访问不畅？试试国内镜像</div>
      <div class="${prefixCls}-message">
        国内镜像站点可以帮助您更快地访问文档和资源。<br>
        请尝试访问 <a class="${prefixCls}-link" href="${officialChinaMirror}">国内镜像站点</a>，以获得更好的体验。
      </div>
      <div class="${prefixCls}-footer">
        <button class="${prefixCls}-action ${prefixCls}-link">🚀 立即前往</button>
      </div>
    </div>
    <button class="${prefixCls}-close">X</button>
    <div class="${prefixCls}-progress" style="--progress: 100%;"></div>
    `;
    document.body.appendChild(notify);

    notify.querySelector(`.${prefixCls}-close`).addEventListener('click', () => {
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

    notify.querySelectorAll(`.${prefixCls}-link`).forEach((link) => {
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

    const progressEl = notify.querySelector(`.${prefixCls}-progress`);
    let currentProgressValue = 100;

    const progress = {
      get value() {
        return currentProgressValue;
      },
      set value(val) {
        currentProgressValue = Math.max(0, Math.min(100, val));
        progressEl.style.setProperty('--progress', `${currentProgressValue}%`);
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
        `antd.mirror-notify: 页面加载超过 ${delayDuration} 秒，可能是网络不畅。\n请尝试访问国内镜像站点。%c${officialChinaMirror}`,
        `color: ${primaryColor}; font-weight: bold;`,
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
