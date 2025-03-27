const fs = require('fs');
const glob = require('glob');

// 查找所有中英文文档
const files = glob.sync('components/**/index.*.md');

files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  // 替换中英文标题，添加锚点
  const updatedContent = content
    .replace(/## 何时使用(?!\s*{#when-to-use})/g, '## 何时使用 {#when-to-use}')
    .replace(/## When to use(?!\s*{#when-to-use})/g, '## When to use {#when-to-use}');
  fs.writeFileSync(file, updatedContent);
  console.log(`Updated: ${file}`);
});

console.log('All files have been updated!');
