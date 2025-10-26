import warning from './warning';

const execCopy = (text: string, isHtmlFormat: boolean) => {
  let copySuccess = false;

  const onCopy = (event: ClipboardEvent) => {
    event.stopPropagation();
    event.preventDefault();
    event.clipboardData?.clearData();
    if (isHtmlFormat) {
      event.clipboardData?.setData('text/html', text);
    } else {
      event.clipboardData?.setData('text/plain', text);
    }
    copySuccess = true;
  };

  try {
    document.addEventListener('copy', onCopy, { capture: true });
    document.execCommand('copy');
    return copySuccess;
  } catch {
    return false;
  } finally {
    document.removeEventListener('copy', onCopy, { capture: true });
  }
};

const asyncCopy = async (text: string, isHtmlFormat: boolean) => {
  try {
    if (isHtmlFormat) {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([text], { type: 'text/html' }),
          'text/plain': new Blob([text], { type: 'text/plain' }),
        }),
      ]);
    } else {
      await navigator.clipboard.writeText(text);
    }
    return true;
  } catch {
    return false;
  }
};

async function copy(text: string, config?: { format?: 'text/plain' | 'text/html' }) {
  if (typeof text !== 'string') {
    warning(false, 'The clipboard content must be of string type', '');
    return false;
  }

  const isHtmlFormat = config?.format === 'text/html';

  if (await asyncCopy(text, isHtmlFormat)) {
    return true;
  }

  if (execCopy(text, isHtmlFormat)) {
    return true;
  }

  return false;
}

export default copy;
