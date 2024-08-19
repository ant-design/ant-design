function checkChromeVersion() {
  const userAgent = navigator.userAgent;
  const chromeVersionMatch = userAgent.match(/Chrome\/([0-9]+)/);
  if (chromeVersionMatch) {
    const chromeVersion = parseInt(chromeVersionMatch[1], 10);
    if (chromeVersion < 90) {
      console.warn('Ant Design 5.19.4 supports Chrome version 90 and above.');
    }
  }
}

export default checkChromeVersion;
