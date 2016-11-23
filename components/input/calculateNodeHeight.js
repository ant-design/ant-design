// Thanks to https://github.com/andreypopp/react-textarea-autosize/

/**
 * calculateNodeHeight(uiTextNode, useCache = false)
 */

const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;

const SIZING_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing',
];

let computedStyleCache = {};
let hiddenTextarea;

function computedStyle(node) {
  return window.getComputedStyle ? getComputedStyle(node) : node.currentStyle;
}

function getStylePropertyValue(style, prop) {
  let value;
  if (style) {
    value = window.getComputedStyle ?
      style.getPropertyValue(prop)
      :
      style[prop.replace(/-(\w)/gi, (word, letter) => letter.toUpperCase())];
  }
  return value;
}

function calculateNodeStyling(node, useCache = false) {
  const nodeRef = (
    node.getAttribute('id') ||
    node.getAttribute('data-reactid') ||
    node.getAttribute('name')
  );

  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef];
  }

  const style = computedStyle(node);

  const boxSizing = (
    getStylePropertyValue(style, 'box-sizing') ||
    getStylePropertyValue(style, '-moz-box-sizing') ||
    getStylePropertyValue(style, '-webkit-box-sizing')
  );

  const paddingSize = (
    parseFloat(getStylePropertyValue(style, 'padding-bottom')) +
    parseFloat(getStylePropertyValue(style, 'padding-top'))
  );

  const borderSize = (
    parseFloat(getStylePropertyValue(style, 'border-bottom-width')) +
    parseFloat(getStylePropertyValue(style, 'border-top-width'))
  );

  const sizingStyle = SIZING_STYLE
    .map(name => `${name}:${getStylePropertyValue(style, name)}`)
    .join(';');

  const nodeInfo = {
    sizingStyle,
    paddingSize,
    borderSize,
    boxSizing,
  };

  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo;
  }

  return nodeInfo;
}

export default function calculateNodeHeight(
  uiTextNode,
  useCache = false,
  minRows = null,
  maxRows = null
) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  // Copy all CSS properties that have an impact on the height of the content in
  // the textbox
  let {
    paddingSize, borderSize,
    boxSizing, sizingStyle,
  } = calculateNodeStyling(uiTextNode, useCache);

  // Need to have the overflow attribute to hide the scrollbar otherwise
  // text-lines will not calculated properly as the shadow will technically be
  // narrower for content
  hiddenTextarea.setAttribute('style', `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`);
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || '';

  let minHeight = -Infinity;
  let maxHeight = Infinity;
  let height = hiddenTextarea.scrollHeight;

  if (boxSizing === 'border-box') {
    // border-box: add border, since height = content + padding + border
    height = height + borderSize;
  } else if (boxSizing === 'content-box') {
    // remove padding, since height = content
    height = height - paddingSize;
  }

  if (minRows !== null || maxRows !== null) {
    // measure height of a textarea with a single row
    hiddenTextarea.value = '';
    let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      if (boxSizing === 'border-box') {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      if (boxSizing === 'border-box') {
        maxHeight = maxHeight + paddingSize + borderSize;
      }
      height = Math.min(maxHeight, height);
    }
  }
  return { height, minHeight, maxHeight };
}
