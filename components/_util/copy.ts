function copy(text: string, config?: { format?: 'text/plain' | 'text/html' }) {
  const format = config?.format;

  if (typeof text !== 'string') {
    console.warn('The clipboard content must be of string type');

    return false;
  }
  const isHtmlFormat = format === 'text/html';
  try {
    if (isHtmlFormat) {
      const item = new ClipboardItem({
        [format]: new Blob([text], { type: format }),
        'text/plain': new Blob([text], { type: 'text/plain' }),
      });
      navigator.clipboard.write([item]);
      return true;
    }
    navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Clipboard API failed:', err);
  }
}

export default copy;
