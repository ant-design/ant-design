const JsonML = require('jsonml.js/lib/utils');

function isStyleTag(node) {
  return node && JsonML.getTagName(node) === 'style';
}

function getCode(node) {
  return JsonML.getChildren(
    JsonML.getChildren(node)[0]
  )[0];
}

module.exports = (markdownData) => {
  const meta = markdownData.meta;
  meta.id = meta.filename.replace(/\.md$/, '').replace(/\//g, '-');

  const contentChildren = JsonML.getChildren(markdownData.content);
  const chineseIntroStart = contentChildren.findIndex((node) => {
    return JsonML.getTagName(node) === 'h2' &&
      JsonML.getChildren(node)[0] === 'zh-CN';
  });
  const englishIntroStart = contentChildren.findIndex((node) => {
    return JsonML.getTagName(node) === 'h2' &&
      JsonML.getChildren(node)[0] === 'en-US';
  });
  const codeIndex = contentChildren.findIndex((node) => {
    return JsonML.getTagName(node) === 'pre' &&
      JsonML.getAttributes(node).lang === 'jsx';
  });
  if (chineseIntroStart > -1 /* equal to englishIntroStart > -1 */) {
    markdownData.content = {
      'zh-CN': contentChildren.slice(chineseIntroStart + 1, englishIntroStart),
      'en-US': contentChildren.slice(englishIntroStart + 1, codeIndex),
    };
  } else {
    markdownData.content = contentChildren.slice(0, codeIndex);
  }

  markdownData.highlightedCode = contentChildren[codeIndex].slice(0, 2);
  markdownData.preview = [
    'pre', { lang: '__react' },
  ].concat(JsonML.getChildren(contentChildren[codeIndex]));

  const styleNode = contentChildren.find((node) => {
    return isStyleTag(node) ||
      (JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === 'css');
  });
  if (isStyleTag(styleNode)) {
    markdownData.style = JsonML.getChildren(styleNode)[0];
  } else if (styleNode) {
    markdownData.style = getCode(styleNode);
    markdownData.highlightedStyle = JsonML.getAttributes(styleNode).highlighted;
  }

  return markdownData;
};
