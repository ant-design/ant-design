import warning from './warning';

function copy(text: string, config?: { format?: 'text/plain' | 'text/html' }) {
  const format = config?.format;

  if (typeof text !== 'string') {
    warning(false, 'The clipboard content must be of string type', '');
    return false;
  }

  try {
    if (format === 'text/html') {
      const item = new ClipboardItem({
        [format]: new Blob([text], { type: format }),
        'text/plain': new Blob([text], { type: 'text/plain' }),
      });
      navigator.clipboard.write([item]);
    } else {
      navigator.clipboard.writeText(text);
    }

    return true;
  } catch (err) {
    warning(false, 'Clipboard API failed:', String(err));
  }
}

export default copy;
