const path = require('path');
const processDoc = require('./process-doc');
const processDemo = require('./process-demo');

module.exports = (markdownData) => {
  const isDemo = path.dirname(markdownData.meta.filename).endsWith('/demo');
  if (isDemo) {
    return processDemo(markdownData);
  }
  return processDoc(markdownData);
};
