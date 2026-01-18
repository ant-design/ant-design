/**
 * 自动应用 @rc-component/form 的修复补丁
 *
 * 修复 Issue: https://github.com/ant-design/ant-design/issues/52931
 * Form.List 在 preserve={false} 时，通过 setFieldsValue 赋值无效
 */

const fs = require('fs');
const path = require('path');

const files = [
  'node_modules/@rc-component/form/es/hooks/useForm.js',
  'node_modules/@rc-component/form/lib/hooks/useForm.js',
];

files.forEach((file) => {
  const filePath = path.resolve(__dirname, '..', file);

  if (!fs.existsSync(filePath)) {
    console.log(`跳过不存在的文件: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 检查是否已经打过补丁
  if (content.includes('&& !isListField) {')) {
    console.log(`✅ ${file} 已经打过补丁`);
    return;
  }

  // 应用补丁
  const oldPattern =
    /if \(!this\.isMergedPreserve\(preserve\) && \(!isListField \|\| subNamePath\.length > 1\)\) \{/g;
  const newCode = 'if (!this.isMergedPreserve(preserve) && !isListField) {';

  if (oldPattern.test(content)) {
    content = content.replace(oldPattern, newCode);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ 成功应用补丁: ${file}`);
  } else {
    console.log(`⚠️  未找到需要修补的内容: ${file}`);
  }
});

console.log('\n@rc-component/form 补丁应用完成！');
