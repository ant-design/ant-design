const fs = require('fs');

const path = require('path');

const blogList = [
  'check-conduct',
  'css-in-js',
  'getContainer',
  'modal-hook-order',
  'render-times',
  'testing-migrate',
  'to-be-collaborator',
].map((blogName) => path.join(__dirname, `../../docs/blog/${blogName}.en-US.md`));

describe('blog', () => {
  it('should not include Chinese in en-US blog', () => {
    blogList.forEach((blog) => {
      fs.readFile(blog, (err: NodeJS.ErrnoException | null, data: Buffer) => {
        if (err) {
          return;
        }
        const includeChinese = /[\u4E00-\u9FA5]/.test(data.toString());
        expect(includeChinese).toBe(false);
      });
    });
  });
});
