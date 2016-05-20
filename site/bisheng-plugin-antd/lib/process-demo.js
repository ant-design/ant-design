const JsonML = require('jsonml.js/lib/utils');

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

  markdownData.code = contentChildren[codeIndex];

  const styleNode = contentChildren.find((node) => {
    return JsonML.getTagName(node) === 'pre' &&
      JsonML.getAttributes(node).lang === 'css';
  });
  if (styleNode) {
    markdownData.highlightedStyle = JsonML.getAttributes(styleNode).highlighted;
  }

  return markdownData;
};
