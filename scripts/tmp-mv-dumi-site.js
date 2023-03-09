/**
 * 将 demo 迁移到临时文件夹，以供 v5-site-upgrade 使用。
 * 升级 v5 完毕后可删除。
 */

const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');

const tmpFolder = `~demo`;

glob('components/**/*.md', (er, files) => {
  fs.ensureDirSync(tmpFolder);
  fs.emptyDirSync(tmpFolder);

  files.forEach((file) => {
    const tmpFilePath = path.resolve(tmpFolder, file);
    const tmpFolderPath = path.dirname(tmpFilePath);
    fs.ensureDirSync(tmpFolderPath);

    fs.copyFileSync(file, tmpFilePath);
  });
});
