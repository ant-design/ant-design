(function createMirrorModal() {
  if (
    (navigator.languages.includes('zh') || navigator.languages.includes('zh-CN')) &&
    /-cn\/?$/.test(window.location.pathname) &&
    !['ant-design.gitee.io', 'ant-design.antgroup.com'].includes(window.location.hostname) &&
    !window.location.host.includes('surge')
  ) {
    const ANTD_DOT_NOT_SHOW_MIRROR_MODAL = 'ANT_DESIGN_DO_NOT_OPEN_MIRROR_MODAL';

    const lastShowTime = window.localStorage.getItem(ANTD_DOT_NOT_SHOW_MIRROR_MODAL);
    if (
      lastShowTime &&
      lastShowTime !== 'true' &&
      Date.now() - new Date(lastShowTime).getTime() < 7 * 24 * 60 * 60 * 1000
    ) {
      return;
    }

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
    height: '100vh';
    width: '100vw';
    background: rgba(0, 0, 0, 0.3);
    z-index: 9999;
    animation: mirror-fade-in 0.3s forwards;
  }

  .mirror-modal-dialog {
    position: fixed;
    inset: 0;
    top: 120px;
    margin-left: auto;
    margin-right: auto;
    width: 400px;
    height: 120px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 8px;
    border: 1px solid #eee;
    background: #fff;
    padding: 20px 24px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
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
    `;
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
    confirmBtn.href = window.location.href.replace(window.location.host, 'ant-design.antgroup.com');
    confirmBtn.innerText = '🚀 立刻前往';
    btnWrapper.append(confirmBtn);

    document.body.append(modal);
    document.body.style.overflow = 'hidden';
  }
})();
