import './index.less';

function isFlexSupported(style) {
  return 'flex' in style ||
    'webkitFlex' in style ||
    'MozFlex' in style;
}

if (typeof window !== undefined && window.document && window.document.documentElement) {
  const { documentElement } = window.document;
  const NO_FLEX = 'no-flex';

  if (!isFlexSupported(documentElement.style) &&
      documentElement.className.indexOf(NO_FLEX) === -1) {
    documentElement.className += ` ${NO_FLEX}`;
  }
}
