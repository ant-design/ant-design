(function createMirrorModal() {
  const isDebug = window.localStorage.getItem('DEBUG') === 'antd';
  const ANTD_DOT_NOT_SHOW_MIRROR_MODAL = 'ANT_DESIGN_DO_NOT_OPEN_MIRROR_MODAL';
  /**
   * If you do not wish to be prompted by the modal again,
   * you can set the next display timestamp manually to a future date.
   * @see https://github.com/ant-design/ant-design/issues/53759
   * For example, the line below sets it to 6 months from now.
   */
  // window.localStorage.setItem("ANT_DESIGN_DO_NOT_OPEN_MIRROR_MODAL", Date.now() + 6 * 30 * 24 * 60 * 60 * 1000);
  let nextShowTimestamp = window.localStorage.getItem(ANTD_DOT_NOT_SHOW_MIRROR_MODAL);

  if (nextShowTimestamp === null) {
    nextShowTimestamp = Date.now() - 0.5 * 60 * 1000; // Set to 30 seconds ago
    window.localStorage.setItem(ANTD_DOT_NOT_SHOW_MIRROR_MODAL, nextShowTimestamp);
  }

  const condition = [
    // Check if the current time is greater than the next show timestamp
    Date.now() > new Date(nextShowTimestamp).getTime(),
    // Check if the browser language is Chinese
    navigator.languages.includes('zh') || navigator.languages.includes('zh-CN'),
    // Check if the URL path ends with -cn
    /-cn\/?$/.test(window.location.pathname),
    // chinese mirror URL
    !['ant-design.gitee.io', 'ant-design.antgroup.com'].includes(window.location.hostname),
    // PR review URL
    !window.location.host.includes('surge'),
    // development mode
    isDebug ? true : !['127.0.0.1', 'localhost'].includes(window.location.hostname),
  ];

  if (isDebug) {
    console.log('🚀 [mirror-modal] nextShowTimestamp:', nextShowTimestamp);
    console.log('🚀 [mirror-modal] condition:', condition);
  }

  // Check if all conditions are met
  const shouldShowMirrorModal = condition.every(Boolean);

  if (shouldShowMirrorModal) {
    const style = document.createElement('style');
    style.innerHTML = `
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
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.3);
    z-index: 9999;
    animation: mirror-fade-in 0.3s forwards;
  }

  .mirror-modal-dialog {
    position: fixed;
    top: 120px;
    inset-inline-start: 0;
    inset-inline-end: 0;
    margin: 0 auto;
    width: 420px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 8px;
    border: 1px solid #eee;
    background: #fff;
    padding: 20px 24px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    animation: mirror-zoom-in 0.3s forwards;
    box-sizing: border-box;
    max-width: 100vw;
    z-index: 9999;
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
    margin-bottom: 24px;
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
    transition: all 0.2s;
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
    margin-inline-end: 8px;
  }

  .mirror-modal-cancel-btn:hover {
    border-color: #4096ff;
    color: #4096ff
  }

  .mirror-modal-cancel-btn:active {
    border-color: #0958d9;
    color: #0958d9;
  }
    `;
    document.head.append(style);

    const modal = document.createElement('div');
    modal.className = 'mirror-modal-mask';

    const dialog = document.createElement('div');
    dialog.className = 'mirror-modal-dialog';
    modal.append(dialog);

    const title = document.createElement('div');
    title.className = 'mirror-modal-title';
    title.textContent = '提示';
    dialog.append(title);

    const content = document.createElement('div');
    content.className = 'mirror-modal-content';
    content.textContent = '🚀 国内用户推荐访问国内镜像以获得极速体验～';
    dialog.append(content);

    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'mirror-modal-btns';
    dialog.append(btnWrapper);

    const cancelBtn = document.createElement('a');
    cancelBtn.className = 'mirror-modal-cancel-btn mirror-modal-btn';
    cancelBtn.textContent = '7 天内不再显示';
    btnWrapper.append(cancelBtn);
    cancelBtn.addEventListener('click', () => {
      const nextShowTimestamp = Date.now() + 7 * 24 * 60 * 60 * 1000;
      window.localStorage.setItem(ANTD_DOT_NOT_SHOW_MIRROR_MODAL, nextShowTimestamp);
      document.body.removeChild(modal);
      document.head.removeChild(style);
      document.body.style.overflow = '';
    });

    const confirmBtn = document.createElement('a');
    confirmBtn.className = 'mirror-modal-confirm-btn mirror-modal-btn';
    confirmBtn.href = window.location.href.replace(window.location.host, 'ant-design.antgroup.com');
    confirmBtn.textContent = '🚀 立刻前往';
    btnWrapper.append(confirmBtn);

    document.body.append(modal);
    document.body.style.overflow = 'hidden';
  }
})();
