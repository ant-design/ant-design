/* eslint-disable no-console, no-await-in-loop, import/no-extraneous-dependencies, lodash/import-scope, no-restricted-syntax */
import path from 'path';
import fs from 'fs';

import fse from 'fs-extra';
import chalk from 'chalk';
import _ from 'lodash';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const compareScreenshots = (
  baseImgPath: string,
  currentImgPath: string,
  diffImage: string,
): number => {
  const baseImg = PNG.sync.read(fs.readFileSync(baseImgPath));
  const currentImg = PNG.sync.read(fs.readFileSync(currentImgPath));

  const { width, height } = baseImg;
  const diff = new PNG({ width, height });

  const mismatchedPixels = pixelmatch(baseImg.data, currentImg.data, diff.data, width, height, {
    threshold: 0.1,
  });

  diff.pack().pipe(fs.createWriteStream(diffImage));

  return (mismatchedPixels / (width * height)) * 100;
};

const readPngs = (dir: string) => fs.readdirSync(dir).filter((n) => n.endsWith('.png'));

const prettyList = (list: string[]) => list.map((i) => ` * ${i}`).join('\n');

async function boot() {
  const baseImgDir = path.resolve(__dirname, '../imageSnapshots-master');
  const currentImgDir = path.resolve(__dirname, '../imageSnapshots');
  const diffImgDir = path.resolve(__dirname, '../imageDiffSnapshots');

  console.log(chalk.blue('⛳ Checking image snapshots with `git fetch origin master`'));
  console.log('\n');

  const baseImgFileList = readPngs(baseImgDir);
  const currentImgFileList = readPngs(currentImgDir);

  const deletedImgs = _.difference(baseImgFileList, currentImgFileList);
  if (deletedImgs.length) {
    console.log(chalk.red('⛔️ Missing images compare to master:\n'), prettyList(deletedImgs));
    console.log('\n');
  }
  // ignore new images
  const newImgs = _.difference(currentImgFileList, baseImgFileList);
  if (newImgs.length) {
    console.log(chalk.green('🆕 Added images:\n'), prettyList(newImgs));
    console.log('\n');
  }

  await fse.ensureDir(diffImgDir);

  for (const file of baseImgFileList) {
    const baseImgPath = path.join(baseImgDir, file);
    const currentImgPath = path.join(currentImgDir, file);
    const diffImgPath = path.join(diffImgDir, file);

    // eslint-disable-next-line
    const currentImgExists = await fse.exists(currentImgPath);
    if (!currentImgExists) {
      console.log(chalk.red(`⛔️ Missing image: ${file}\n`));
      continue;
    }

    const mismatchedPxPercent = compareScreenshots(baseImgPath, currentImgPath, diffImgPath);

    if (mismatchedPxPercent > 0) {
      console.log(
        chalk.yellow(`Mismatched pixels for ${file}: ${mismatchedPxPercent.toFixed(2)}%\n`),
      );
    }
  }
}

boot();
