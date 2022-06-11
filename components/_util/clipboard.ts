// eslint-disable-next-line import/prefer-default-export
export const writeText = (content: string, format?: 'text/plain' | 'text/html') =>
  new Promise<void>((resolve, reject) => {
    const range = document.createRange();
    range.selectNodeContents(document.body);
    document.getSelection()?.addRange(range);

    let success = false;
    const listener = (e: ClipboardEvent) => {
      e.preventDefault();
      const clipboardData = e.clipboardData || (window as any).clipboardData;
      clipboardData?.clearData();
      clipboardData?.setData(format || 'text/plain', content);
      success = true;
    };
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
    document.getSelection()?.removeAllRanges();
    if (success) {
      resolve();
    } else {
      reject();
    }
  });
