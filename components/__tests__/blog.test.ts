import fs from 'node:fs';
import path from 'node:path';

const blogDir = path.join(__dirname, '../../docs/blog');

const blogList = fs
  .readdirSync(blogDir, { withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .filter((file) => file.endsWith('.en-US.md'))
  .map((file) => path.join(blogDir, file));

describe('Chinese detected in en-US blog', () => {
  it('should not include Chinese in en-US blog', () => {
    for (const blog of blogList) {
      const data = fs.readFileSync(blog, 'utf-8');
      const includeChinese = /[\u4E00-\u9FA5]/.test(data);
      if (includeChinese) {
        console.error('❌ 检测到中文：', blog);
      }
      expect(includeChinese).toBe(false);
    }
  });
});
