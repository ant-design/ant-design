const JsonML = require('jsonml.js/lib/utils');

module.exports = (markdownData) => {
  const contentChildren = JsonML.getChildren(markdownData.content);
  const apiStartIndex = contentChildren.findIndex((node) => {
    return JsonML.getTagName(node) === 'h2' &&
      JsonML.getChildren(node)[0] === 'API';
  });
  const content = contentChildren.slice(0, apiStartIndex);
  const api = contentChildren.slice(apiStartIndex);

  markdownData.content = ['section'].concat(content);
  markdownData.api = ['section'].concat(api);
  return markdownData;
};
