function fallbackCopy(text: string, debug?: any) {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // 避免滚动跳动
    document.body.appendChild(textarea);
    textarea.select();

    // 扩展选中范围 (兼容 iOS)
    if (textarea.setSelectionRange) {
      const range = document.createRange();
      range.selectNodeContents(textarea);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textarea.setSelectionRange(0, 999999);
    }

    const result = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (debug) {
      console.warn(`copy ${result ? 'success' : 'error'}`);
    }
    return result;
  } catch (err) {
    if (debug) console.warn('copy error:', err);
    return false;
  }
}

export default (
  text: string,
  config?: { debug?: boolean; format?: 'text/plain' | 'text/html' },
) => {
  const debug = config?.debug || true;
  const format = config?.format;

  if (typeof text !== 'string') {
    if (debug) {
      console.warn('剪贴板内容必须是字符串类型');
    }
    return false;
  }

  if (navigator.clipboard?.writeText) {
    if (format === 'text/html') {
      const item = new ClipboardItem({
        [format]: new Blob([text], { type: format }),
        'text/plain': new Blob([text], { type: 'text/plain' }),
      });

      navigator.clipboard
        .write([item])
        .then(() => {
          if (debug) console.warn('copy success');
        })
        .catch((err) => {
          if (debug) console.warn('copy failed:', err);
        });
      return true;
    }
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (debug) console.warn('copy success');
      })
      .catch((err) => {
        if (debug) console.warn('copy failed:', err);
        fallbackCopy(text, debug);
      });
    return true;
  }

  return fallbackCopy(text, debug);
};
