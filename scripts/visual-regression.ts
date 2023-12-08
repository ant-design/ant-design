/* eslint-disable compat/compat */
/* eslint-disable no-console, no-await-in-loop, import/no-extraneous-dependencies, lodash/import-scope, no-restricted-syntax */
import path from 'path';
import fs from 'fs';
import os from 'os';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

import tar from 'tar';
import fse from 'fs-extra';
import chalk from 'chalk';
import _ from 'lodash';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import sharp from 'sharp';

const compareScreenshots = async (
  baseImgPath: string,
  currentImgPath: string,
  diffImagePath: string,
): Promise<number> => {
  const baseImgBuf = await sharp(baseImgPath).toBuffer();
  const currentImgBuf = await sharp(currentImgPath).toBuffer();

  const basePng = PNG.sync.read(baseImgBuf);
  const targetWidth = basePng.width;
  const targetHeight = basePng.height;

  const comparePng = PNG.sync.read(
    await sharp(currentImgBuf)
      .resize({
        width: targetWidth,
        height: targetHeight,
        fit: sharp.fit.contain,
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .png()
      .toBuffer(),
  );

  const diffPng = new PNG({ width: targetWidth, height: targetHeight });

  const mismatchedPixels = pixelmatch(
    basePng.data,
    comparePng.data,
    diffPng.data,
    targetWidth,
    targetHeight,
    { threshold: 0.1, diffMask: false },
  );

  // if mismatched then write diff image
  if (mismatchedPixels) {
    diffPng.pack().pipe(fs.createWriteStream(diffImagePath));
  }

  return (mismatchedPixels / (targetWidth * targetHeight)) * 100;
};

const readPngs = (dir: string) => fs.readdirSync(dir).filter((n) => n.endsWith('.png'));

const prettyList = (list: string[]) => list.map((i) => ` * ${i}`).join('\n');

const ossDomain = `https://${process.env.ALI_OSS_BUCKET}.oss-cn-shanghai.aliyuncs.com`;

async function downloadFile(url: string, destPath: string) {
  const response = await fetch(url);
  if (!response.ok || response.status !== 200) {
    throw new Error(`Download file failed: ${new URL(url).pathname}`);
  }
  // @ts-ignore
  const body = Readable.fromWeb(response.body);
  await finished(body.pipe(fs.createWriteStream(destPath)));
}

async function downloadBaseSnapshots(refName: string, targetDir: string) {
  const baseImageRefUrl = `${ossDomain}/${refName}/visual-regression-ref.txt`;
  // get content from baseImageRefText
  const res = await fetch(baseImageRefUrl);
  const text = await res.text();
  const ref = text.trim();

  if (ref) {
    // download imageSnapshotsUrl
    const imageSnapshotsUrl = `${ossDomain}/${ref}/imageSnapshots.tar.gz`;
    const targzPath = path.resolve(os.tmpdir(), `./${path.basename(targetDir)}.tar.gz`);
    await downloadFile(imageSnapshotsUrl, targzPath);
    // untar
    return tar.x({
      strip: 1,
      C: targetDir,
      file: targzPath,
    });
  }

  throw new Error(`Missing base snapshots from ${refName}, ${ref}`);
}

async function boot() {
  console.log(chalk.green('Preparing image snapshots from latest `master` branch\n'));
  const baseImgSourceDir = path.resolve(__dirname, '../imageSnapshots-master');
  await fse.ensureDir(baseImgSourceDir);

  await downloadBaseSnapshots('master', baseImgSourceDir);

  const currentImgSourceDir = path.resolve(__dirname, '../imageSnapshots');

  const reportDir = path.resolve(__dirname, '../visualRegressionReport');
  // save diff images(x3) to reportDir
  const diffImgReportDir = path.resolve(reportDir, './images/diff');
  const baseImgReportDir = path.resolve(reportDir, './images/base');
  const currentImgReportDir = path.resolve(reportDir, './images/current');

  await fse.ensureDir(diffImgReportDir);
  await fse.ensureDir(baseImgReportDir);
  await fse.ensureDir(currentImgReportDir);

  console.log(chalk.blue('⛳ Checking image snapshots with branch `master`'));
  console.log('\n');

  const baseImgFileList = readPngs(baseImgSourceDir);
  const currentImgFileList = readPngs(currentImgSourceDir);

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

  const badCaseCounts: {
    type: 'removed' | 'changed';
    filename: string;
  }[] = [];

  for (const file of baseImgFileList) {
    const baseImgPath = path.join(baseImgSourceDir, file);
    const currentImgPath = path.join(currentImgSourceDir, file);
    const diffImgPath = path.join(diffImgReportDir, file);

    const currentImgExists = await fse.exists(currentImgPath);
    if (!currentImgExists) {
      console.log(chalk.red(`⛔️ Missing image: ${file}\n`));
      badCaseCounts.push({
        type: 'removed',
        filename: file,
      });
      await fse.copy(baseImgPath, path.join(baseImgReportDir, file));
      continue;
    }

    const mismatchedPxPercent = await compareScreenshots(baseImgPath, currentImgPath, diffImgPath);

    if (mismatchedPxPercent > 0) {
      console.log(
        'Mismatched pixels for:',
        chalk.yellow(file),
        `${mismatchedPxPercent.toFixed(2)}%\n`,
      );
      // copy compare imgs(x2) to report dir
      await fse.copy(baseImgPath, path.join(baseImgReportDir, file));
      await fse.copy(currentImgPath, path.join(currentImgReportDir, file));

      badCaseCounts.push({
        type: 'changed',
        filename: file,
      });
    } else {
      console.log('Passed for: %s\n', chalk.green(file));
    }
  }

  if (badCaseCounts.length) {
    console.log(chalk.red('⛔️ Failed cases:\n'), prettyList(badCaseCounts.map((i) => i.filename)));
    console.log('\n');
  }

  const jsonl = badCaseCounts.map((i) => JSON.stringify(i)).join('\n');
  // write jsonl report to diffImgDir
  await fse.writeFile(path.join(reportDir, './report.jsonl'), jsonl);

  await tar.c(
    {
      gzip: true,
      cwd: reportDir,
      file: `${path.basename(reportDir)}.tar.gz`,
    },
    await fse.readdir(reportDir),
  );
}

boot();
