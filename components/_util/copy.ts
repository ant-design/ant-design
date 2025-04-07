function fallbackCopy(text: string, debug?: any) {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();

    if (textarea.setSelectionRange) {
      const range = document.createRange();
      range.selectNodeContents(textarea);
      const selection = window.getSelection() as Selection;
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

function copy(text: string, config?: { debug?: boolean; format?: 'text/plain' | 'text/html' }) {
  const debug = config?.debug || true;
  const format = config?.format;

  if (typeof text !== 'string') {
    if (debug) {
      console.warn('The clipboard content must be of string type');
    }
    return false;
  }
  const isHtmlFormat = format === 'text/html';
  try {
    if (isHtmlFormat) {
      if (navigator.clipboard?.write) {
        const item = new ClipboardItem({
          [format]: new Blob([text], { type: format }),
          'text/plain': new Blob([text], { type: 'text/plain' }),
        });

        navigator.clipboard.write([item]).then(() => {
          if (debug) console.warn('copy success');
        });

        return true;
      }
      return fallbackCopy(text, debug);
    } else {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          if (debug) console.warn('copy success');
        });
        return true;
      }
      return fallbackCopy(text, debug);
    }
  } catch (err) {
    if (debug) console.error('Clipboard API failed:', err);
  }
  return fallbackCopy(text, debug);
}

export default copy;
