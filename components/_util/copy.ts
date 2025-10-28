import warning from './warning';

const copy = (text: string) => {
  if (typeof text !== 'string') {
    const errorMessage = `The clipboard content must be of string type, but got ${typeof text}.`;
    warning(false, errorMessage);
    return Promise.reject(new Error(errorMessage));
  }

  // 优先使用安全、现代的 Clipboard API
  if (typeof navigator.clipboard !== 'undefined' && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }

  //  回退方案：创建隐藏 textarea + execCommand('copy')
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.readOnly = true;
  textArea.tabIndex = -1;
  textArea.style.pointerEvents = 'none';
  textArea.style.position = 'absolute';
  textArea.style.opacity = '0';
  textArea.style.insetInlineEnd = '-999999px';
  textArea.style.top = '-999999px';
  textArea.style.zIndex = '-999';
  document.body.append(textArea);
  textArea.focus();
  textArea.select();
  return new Promise<void>((resolve, reject) => {
    // 执行复制命令，移除文本框
    const ok = document.execCommand('copy');
    if (ok) {
      resolve();
    } else {
      reject(new Error('Copy command was unsuccessful'));
    }
    textArea.remove();
  });
};

export default copy;
