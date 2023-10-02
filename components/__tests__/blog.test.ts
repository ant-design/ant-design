const fs = require('fs');

const path = require('path');

const blogList = [
  'check-conduct',
  'contributor-development-maintenance-guide',
  'css-in-js',
  'extract-ssr',
  'getContainer',
  'github-actions-workflow',
  'issue-helper',
  'mock-project-build',
  'modal-hook-order',
  'testing-migrate',
  'render-times',
  'to-be-collaborator',
  'tooltip-align',
  'tree-shaking',
  'why-not-static',
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
