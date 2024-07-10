// codemod.js
const path1 = require('path');
const fs = require('fs');
const { API, FileInfo, Options } = require('jscodeshift');
const { replace } = require('lodash');

module.exports = (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // 查找所有 imageDemoTest 调用
  root
    .find(j.CallExpression, {
      callee: {
        name: 'imageDemoTest',
      },
    })
    .forEach((path) => {
      // 确保有至少两个参数
      if (path.node.arguments.length >= 1) {
        const firstArg = path.node.arguments[0];
        // 将第一个参数转换为源代码字符串
        const firstArgSource = j(firstArg).toSource();

        let content = `export default { id: ${firstArgSource}`;
        if (path.node.arguments[1]) {
          // 将第二个参数转换为源代码字符串
          const secondArg = path.node.arguments[1];
          const secondArgSource = j(secondArg).toSource();
          content += ',';
          content += secondArgSource.replace(/^'|'$/g, '').replace('{', '').replace('}', '');
        }
        content += ` };`;
        // 将结果写入到文件中
        fs.writeFileSync(
          path1.join(__dirname, path1.dirname(fileInfo.path), 'visual-diff.config.ts'),
          content,
        );
      }
    });

  return fileInfo.source;
};
