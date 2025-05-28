(function createMirrorModal() {
  const SIGN = Symbol.for('antd.mirror-notify');
  const isDebug = window.localStorage.getItem('DEBUG') === 'antd';

  const enabledCondition = [
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

  const isEnabled = enabledCondition.every(Boolean);

  if (!isEnabled) return;

  function insertCss() {
    const style = document.createElement('style');
    style.innerHTML = ``;

    document.head.append(style);
  }

  function createNotification() {
    const notify = document.createElement('div');
    notify.id = 'antd-mirror-notify';
    notify.innerHTML = `

  `;
    document.body.appendChild(notify);
  }

  function run() {
    let isFound = false;

    const timeoutId = setTimeout(() => {
      if (!isFound) {
        createNotification();
      }
    }, 6 * 1000);

    const intervalId = setInterval(() => {
      if (window[SIGN] !== undefined) {
        isFound = true;
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      }
    }, 100);
  }

  insertCss();
  run();
})();
