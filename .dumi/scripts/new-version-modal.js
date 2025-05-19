(function createNewVersionModal() {
  const LAST_VESTED_VERSION_KEY = 'ANT_DESIGN_LAST_VISITED_VERSION';
  const SEMVER_REGEX = /^\d+\.\d+\.\d+$/;
  const lastVestedVersion = window.localStorage.getItem(LAST_VESTED_VERSION_KEY) || '0.0.0';

  const currentVersion = (() => {
    const elements = document.querySelector('meta[name="version"]');
    if (elements) return elements.content;
    return '0.0.1';
  })();

  function versionToWeight(version) {
    if (SEMVER_REGEX.test(version)) {
      const [major, minor, patch] = version.split('.').map(Number);
      return major * 1_000_000 + minor * 1_000 + patch;
    }
    return 0;
  }

  const showModal = [
    versionToWeight(currentVersion) > versionToWeight(lastVestedVersion),
    !window.location.pathname.startsWith('/changelog'), // not changelog page
    !(window.location.pathname === '/'), // not home page
  ].every(Boolean);

  if (!showModal) {
    return;
  }

  const showMirrorBtn = [
    navigator.languages.some((lang) => lang.startsWith('zh')),
    window.location.pathname.endsWith('-cn'),
    !['ant-design.gitee.io', 'ant-design.antgroup.com'].includes(window.location.hostname),
  ].every(Boolean);

  const baseUrl = showMirrorBtn ? 'https://ant-design.antgroup.com' : window.location.origin;

  const [lang, locale] = (() => {
    const _locale = {
      cn: {
        title: `v${currentVersion} 现已发布 🎉`,
        content: `更多新功能和改进，请查看 <a href="${baseUrl}/changelog">更新日志</a>。`,
        mirrorTips: '🚀 国内用户推荐访问国内镜像以获得极速体验～',
        mirrorBtn: '🚀 国内镜像',
        getStarted: '开始使用',
      },
      en: {
        title: `v${currentVersion} is released 🎉`,
        content: `For more new features and improvements, please check the <a href="${window.location.origin}/changelog">changelog</a>.`,
        mirrorTips:
          'Recommend users in China to visit the domestic mirror for a faster experience.',
        mirrorBtn: '🇨🇳 China Mirror',
        getStarted: `Get Started`,
      },
    };

    const localeKey =
      window.location.pathname.endsWith('-cn') || (navigator.language || '').startsWith('zh')
        ? 'cn'
        : 'en';

    return [localeKey, _locale[localeKey]];
  })();
  // ========== create modal ==========

  const prefix = 'new-version';
  const style = document.createElement('style');

  style.innerHTML = `
  @keyframes ${prefix}-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes ${prefix}-zoom-in {
    from {
      transform: scale(0.8);
    }
    to {
      transform: scale(1);
    }
  }

  .${prefix}-modal-mask {
    position: fixed;
    inset: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.3);
    z-index: 9999;
    animation: ${prefix}-fade-in 0.3s forwards;
  }

  .${prefix}-modal-dialog {
    position: fixed;
    top: 120px;
    inset-inline-start: 0;
    inset-inline-end: 0;
    margin: 0 auto;
    max-width: ${lang === 'cn' ? '460px' : '540px'};
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 8px;
    border: 1px solid #eee;
    background: #fff;
    padding: 20px 24px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    animation: ${prefix}-zoom-in 0.3s forwards;
    box-sizing: border-box;
    z-index: 9999;
  }

  .${prefix}-modal-title {
    font-size: 16px;
    font-weight: 500;
    align-self: flex-start;
    margin-bottom: 8px;
  }

  .${prefix}-modal-content {
    font-size: 14px;
    align-self: flex-start;
    margin-bottom: 24px;
  }

  .${prefix}-mirror-tips {
    font-size: 12px;
    margin: 8px 24px 0 0;
  }

  .${prefix}-modal-content > a {
    color: #1677ff;
    text-decoration: none;
  }

  .${prefix}-modal-btns {
    align-self: flex-end;
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }

  .${prefix}-modal-btn {
    border-radius: 6px;
    cursor: pointer;
    height: 32px;
    box-sizing: border-box;
    font-size: 14px;
    padding: 4px 16px;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.2s;
  }

  .${prefix}-modal-confirm-btn {
    background: #1677ff;
    color: #fff;
  }

  .${prefix}-modal-confirm-btn:hover {
    background: #4096ff;
  }

  .${prefix}-modal-confirm-btn:active {
    background: #0958d9;
  }

  .${prefix}-modal-mirror-btn {
    border: 1px solid #eee;
    color: #000;
  }

  .${prefix}-modal-mirror-btn:hover {
    border-color: #4096ff;
    color: #4096ff
  }

  .${prefix}-modal-mirror-btn:active {
    border-color: #0958d9;
    color: #0958d9;
  }
  `;

  const modal = document.createElement('div');
  modal.setAttribute('tabindex', '0');
  modal.innerHTML = `
  <div class="${prefix}-modal-mask">
    <div class="${prefix}-modal-dialog">
      <div class="${prefix}-modal-title">${locale.title}</div>
      <div class="${prefix}-modal-content">
        ${locale.content}
        ${showMirrorBtn ? `<div class="${prefix}-mirror-tips">${locale.mirrorTips}</div>` : ''}
      </div>
      <div class="${prefix}-modal-btns">
        ${
          showMirrorBtn
            ? `<a href="${window.location.href.replace(window.location.host, 'ant-design.antgroup.com')}" class="${prefix}-modal-btn ${prefix}-modal-mirror-btn">${locale.mirrorBtn}</a>`
            : ''
        }
        <a href="${window.location.origin}/components/overview/" class="${prefix}-modal-confirm-btn ${prefix}-modal-btn">${locale.getStarted}</a>
    </div>
  </div>
  `;
  function handleClick() {
    window.localStorage.setItem(LAST_VESTED_VERSION_KEY, currentVersion);
    document.body.removeChild(modal);
    document.body.style.overflow = '';
  }
  // modal.querySelector(`.${prefix}-modal-mask`).addEventListener('click', handleClick);
  modal.querySelector(`.${prefix}-modal-confirm-btn`).addEventListener('click', handleClick);
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      handleClick();
    }
  });

  document.head.append(style);
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
})();
